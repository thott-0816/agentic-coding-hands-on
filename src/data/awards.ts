export interface AwardCategory {
  name: string;
  slug: string;
  description: string;
  imagePath: string;
}

export const awards: AwardCategory[] = [
  {
    name: "Top Talent",
    slug: "top-talent",
    description:
      "Vinh danh top cá nhân xuất sắc trên mọi phương diện",
    imagePath: "/images/awards/top-talent.png",
  },
  {
    name: "Top Project",
    slug: "top-project",
    description:
      "Vinh danh dự án xuất sắc trên mọi phương diện, dự án có doanh thu nổi bật",
    imagePath: "/images/awards/top-project.png",
  },
  {
    name: "Top Project Leader",
    slug: "top-project-leader",
    description:
      "Vinh danh người quản lý truyền cảm hứng và dẫn dắt dự án bứt phá, bất",
    imagePath: "/images/awards/top-project-leader.png",
  },
  {
    name: "Best Manager",
    slug: "best-manager",
    description:
      "Vinh danh người quản lý có năng lực quản lý tốt, dẫn dắt đội nhóm",
    imagePath: "/images/awards/best-manager.png",
  },
  {
    name: "Signature 2025 - Creator",
    slug: "signature-2025-creator",
    description:
      "Vinh danh người quản lý có năng lực quản lý tốt, dẫn dắt đội nhóm",
    imagePath: "/images/awards/signature-2025-creator.png",
  },
  {
    name: "MVP (Most Valuable Person)",
    slug: "mvp",
    description:
      "Vinh danh người quản lý có năng lực quản lý tốt, dẫn dắt đội nhóm",
    imagePath: "/images/awards/mvp.png",
  },
];
