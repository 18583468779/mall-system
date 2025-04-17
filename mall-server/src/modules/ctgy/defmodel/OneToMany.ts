import { secondCtgyModel } from "./SecCtgyModel";
import { ThirdCtgyModel } from "../../decormodel/ThirdCtgyModel";
// OneToMany 一对多的关系
secondCtgyModel.hasMany(ThirdCtgyModel, {
  as: "thirdctgy",
  foreignKey: "secctgyid",
});
// ManyToOne 多对一的关系
ThirdCtgyModel.belongsTo(secondCtgyModel, {
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
        model: ThirdCtgyModel,
        as: "thirdctgy",
      },
    ],
  });
  return result;
}
