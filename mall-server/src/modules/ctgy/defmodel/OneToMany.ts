import { secondCtgyModel } from "./SecCtgyModel";
import { thirdCtgyModel } from "./ThirdCtgyModel";
// OneToMany 一对多的关系
secondCtgyModel.hasMany(thirdCtgyModel, {
  as: "thirdctgy",
  foreignKey: "secctgyid",
});
// ManyToOne 多对一的关系
thirdCtgyModel.belongsTo(secondCtgyModel, {
  foreignKey: "secctgyid",
  targetKey: "secondctgyid",
});

export async function findSecThrdCtgysByFstCtgyId(firstctgyId: number) {
  const result = await secondCtgyModel.findAll({
    // raw: true,
    where: {
      firstctgyId,
    },
    include: [
      {
        model: thirdCtgyModel,
        as: "thirdctgy",
      },
    ],
  });
  return result;
}
