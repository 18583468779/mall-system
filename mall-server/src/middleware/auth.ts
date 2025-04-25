// 新中间件：支持游客模式的角色权限校验
export const requireRoles = (roles: number[] = [], options?: { hideUrls: boolean }) => {
  return async (ctx: any, next: any) => {
    // 初始化用户角色（默认游客）
    const defaultRole = -1; // 假设-1是游客角色ID
    let userRole = defaultRole;
    
    // 如果存在认证用户则使用真实角色
    if (ctx.state.user?.roleId) {
      userRole = ctx.state.user.roleId;
    } else {
      // 标记为游客身份（可根据需要设置到上下文）
      ctx.state.guest = true;
    }

    // 计算权限状态
    const hasPermission = roles.length === 0 || roles.includes(userRole);
    
    // 设置权限上下文
    ctx.state.permission = {
      hasFullAccess: hasPermission,
      needHideUrls: options?.hideUrls && !hasPermission,
      isGuest: !ctx.state.user
    };

    // 无论是否通过都继续执行后续中间件
    await next();
  };
};

// VIP专属中间件（角色2为VIP，0为管理员）
export const requireVIP = requireRoles([2, 0], { hideUrls: true });

// 公共访问中间件（允许所有用户包含游客）
export const requirePublic = requireRoles([]); 
