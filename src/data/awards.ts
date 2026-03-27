export interface AwardCategory {
  name: string;
  slug: string;
  description: string;
  imagePath: string;
  fullDescription?: string;
  quantity?: number;
  unit?: string;
  prizeValue?: string;
  prizeNote?: string;
  prizeValueTeam?: string;
  prizeNoteTeam?: string;
}

export const awards: AwardCategory[] = [
  {
    name: "Top Talent",
    slug: "top-talent",
    description: "Vinh danh top cá nhân xuất sắc trên mọi phương diện",
    imagePath: "/images/awards/top-talent.png",
    fullDescription:
      "Giải thưởng Top Talent vinh danh những cá nhân xuất sắc trên mọi phương diện. Với tinh thần sáng tạo, khả năng giải quyết vấn đề vượt trội và sự đóng góp không ngừng, họ đã trở thành nguồn cảm hứng vì tất cả cộng sự, đồng thời đặt dấu ấn đáng tự hào trên hành trình phát triển chung.",
    quantity: 10,
    unit: "awards.unit.unit",
    prizeValue: "7.000.000 VNĐ",
    prizeNote: "awards.prize.perAward",
  },
  {
    name: "Top Project",
    slug: "top-project",
    description: "Vinh danh dự án xuất sắc trên mọi phương diện, dự án có doanh thu nổi bật",
    imagePath: "/images/awards/top-project.png",
    fullDescription:
      "Giải thưởng Top Project vinh danh các dự án xuất sắc về kết quả vượt kỳ vọng. Những dự án này có sự tác động lớn đến khách hàng, thị trường và cộng đồng. Đây là các dự án đã nỗ lực và phát triển kỹ thuật cao, tiếp thu những nguồn lực dồi dào từ mạng lưới quan hệ Sun*, sáng tạo mới và nhân viên giỏi phấn đấu không mệt mỏi từ cấp quản lý đến nhân viên, giúp tạo ra nội dung hình mẫu và có thể xuất sắc và thuyết phục.",
    quantity: 2,
    unit: "awards.unit.team",
    prizeValue: "15.000.000 VNĐ",
    prizeNote: "awards.prize.perAward",
  },
  {
    name: "Top Project Leader",
    slug: "top-project-leader",
    description: "Vinh danh người quản lý truyền cảm hứng và dẫn dắt dự án bứt phá",
    imagePath: "/images/awards/top-project-leader.png",
    fullDescription:
      'Giải thưởng Top Project Leader vinh danh những nhà quản lý dự án xuất sắc - những người hết lòng vì sự thành công của dự án. Họ là những người tâm huyết, truyền cảm hứng và luôn tìm mọi cách để cùng nhóm vượt qua thử thách và đạt được mục tiêu. Với vai trò "Anh High – Đa Aghi" trong mỗi team, họ đã giúp nâng tầm chất lượng dự án, tạo dựng niềm tin từ khách hàng và đóng góp to lớn cho tổ chức.',
    quantity: 3,
    unit: "awards.unit.individual",
    prizeValue: "7.000.000 VNĐ",
    prizeNote: "awards.prize.perAward",
  },
  {
    name: "Best Manager",
    slug: "best-manager",
    description: "Vinh danh người quản lý có năng lực quản lý tốt, dẫn dắt đội nhóm",
    imagePath: "/images/awards/best-manager.png",
    fullDescription:
      "Giải thưởng Best Manager vinh danh những nhà quản lý xuất sắc – những người đã dẫn dắt đội nhóm vượt qua mọi thách thức, tạo động lực cho từng thành viên và không ngừng phát triển. Dưới sự dẫn dắt của họ, đội ngũ công nghệ trở nên hùng mạnh, năng lực đa dạng, sáng tạo, sẵn sàng đón nhận thử thách, thích ứng nhanh với sự thay đổi và tối ưu hiệu suất tổng thể.",
    quantity: 1,
    unit: "awards.unit.individual",
    prizeValue: "10.000.000 VNĐ",
  },
  {
    name: "Signature 2025 - Creator",
    slug: "signature-2025-creator",
    description: "Vinh danh cá nhân và tập thể xuất sắc trong sáng tạo",
    imagePath: "/images/awards/signature-2025-creator.png",
    fullDescription:
      'Giải thưởng Signature vinh danh cá nhân và nhóm hội tụ trí tuệ từ nhiều lĩnh vực, tìm ra giải pháp sáng tạo, vượt qua Sun* hướng tới cộng đồng. Trong năm 2025, giải thưởng Signature vinh danh Sunner Creator – cá nhân/đội thể mang tới cho cộng đồng những sản phẩm truyền thông hình ảnh, sáng tạo nội dung với những giải pháp thực tiễn, mang lại giá trị và cải thiện trải nghiệm, khiến những người khác phải "wow".',
    quantity: 1,
    unit: "awards.unit.individual",
    prizeValue: "5.000.000 VNĐ",
    prizeNote: "awards.prize.individual",
    prizeValueTeam: "8.000.000 VNĐ",
    prizeNoteTeam: "awards.prize.team",
  },
  {
    name: "MVP (Most Valuable Person)",
    slug: "mvp",
    description: "Vinh danh cá nhân có giá trị nhất",
    imagePath: "/images/awards/mvp.png",
    fullDescription:
      'Giải thưởng MVP vinh danh và khẳng định sự xuất sắc nhất của Sun* – người gắn kết các bộ phận với nhau như một bộ tập hợp. Họ là người đã thể hiện năng lực vượt trội, tinh thần cống hiến, hết mình lao động và đóng góp tiên phong trong mọi hoạt động Sun* đã triển khai. Không chỉ nổi bật hết hiệu suất và kết quả công việc, họ còn là người luôn "hết tốc lực" truyền cảm hứng, dẫn dắt và định hướng văn hóa. MVP đại diện cho tinh thần cho mỗi chúng ta. MVP là người mà mọi người trong tổ chức Sun* đều có thể nhìn vào với "sự kính trọng, người phấn đấu đến để trở thành những Sun* tốt nhất."',
    quantity: 1,
    unit: "awards.unit.individual",
    prizeValue: "15.000.000 VNĐ",
  },
];
