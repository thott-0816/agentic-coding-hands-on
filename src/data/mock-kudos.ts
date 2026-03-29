import type { Kudo, KudoUser } from "@/types/kudos";

export const users: KudoUser[] = [
  { id: "u1", name: "Nguyễn Hoàng Long", email: "", avatar_url: "", department: "CTO" },
  { id: "u2", name: "Trần Thị Minh Anh", email: "", avatar_url: "", department: "CEVC1 - DSV" },
  { id: "u3", name: "Phạm Minh Đức", email: "", avatar_url: "", department: "SPD" },
  { id: "u4", name: "Lê Thanh Hà", email: "", avatar_url: "", department: "STVC - R&D" },
  { id: "u5", name: "Vũ Quang Huy", email: "", avatar_url: "", department: "CEVC3" },
  { id: "u6", name: "Đỗ Thị Hương", email: "", avatar_url: "", department: "OPDC - HRF" },
  { id: "u7", name: "Hoàng Văn Nam", email: "", avatar_url: "", department: "GEU" },
  { id: "u8", name: "Nguyễn Bá Châu", email: "", avatar_url: "", department: "CEVC1 - AIE" },
  { id: "u9", name: "Lê Văn Tùng", email: "", avatar_url: "", department: "FCOV" },
  { id: "u10", name: "Huỳnh Dương Xuân Nhật", email: "", avatar_url: "", department: "CEVC2" },
  { id: "u11", name: "Trần Quốc Bảo", email: "", avatar_url: "", department: "STVC" },
  { id: "u12", name: "Nguyễn Thị Lan", email: "", avatar_url: "", department: "CEVC4" },
  { id: "u13", name: "Phan Văn Minh", email: "", avatar_url: "", department: "PAO" },
  { id: "u14", name: "Bùi Thị Mai", email: "", avatar_url: "", department: "FCOV - F&A" },
];

const hashtagSets = [
  ["#Toàn diện", "#Truyền cảm hứng"],
  ["#Hiệu suất cao", "#Giỏi chuyên môn"],
  ["#Cống hiến", "#Wasshoi"],
  ["#Aim High", "#Be Agile"],
  ["#Hướng mục tiêu", "#Hướng khách hàng"],
  ["#Chuẩn quy trình", "#Giải pháp sáng tạo"],
  ["#Quản lý xuất sắc", "#Toàn diện"],
  ["#Truyền cảm hứng", "#Cống hiến", "#Aim High"],
  ["#Be Agile", "#Wasshoi", "#Hiệu suất cao"],
  ["#Giỏi chuyên môn", "#Hướng mục tiêu"],
  ["#Toàn diện", "#Chuẩn quy trình", "#Quản lý xuất sắc"],
  ["#Giải pháp sáng tạo", "#Hướng khách hàng"],
];

const categories = [
  "IDOL GIỚI TRẺ", "TECH STAR", "NGƯỜI TRUYỀN LỬA", "AI PIONEER",
  "DREAM TEAM", "NIGHT OWL", "CERTIFIED PRO", "SUPER CONNECTOR",
];

const contents = [
  "Cảm ơn em bình thường nhưng phi thường :D Cảm ơn sự chăm chỉ, cần mẫn của em đã tạo động lực rất nhiều cho team.",
  "Anh muốn ghi nhận sự nỗ lực không ngừng của em trong việc cải thiện performance hệ thống.",
  "Chị ơi, em muốn gửi lời cảm ơn chân thành nhất. Chị luôn là người truyền cảm hứng cho cả team.",
  "Cảm ơn bạn đã chia sẻ kiến thức về AI và machine learning. Nhờ buổi sharing mà team hiểu rõ hơn.",
  "Gửi lời cảm ơn đặc biệt - các bạn đã làm việc rất chăm chỉ trong sprint vừa qua! Cùng nhau cố gắng trong thời gian tới nhé.",
  "Cảm ơn em đã stay late để fix bug critical. Tinh thần trách nhiệm của em là tấm gương cho cả team.",
  "Chúc mừng anh đã hoàn thành certification! Đây là minh chứng cho sự nỗ lực học hỏi không ngừng.",
  "Cảm ơn chị đã tổ chức team building rất vui và ý nghĩa. Mọi người đều rất gắn kết hơn sau sự kiện.",
  "Kudos đặc biệt vì đã mentor cho intern rất tận tâm. Các bạn intern feedback rất tích cực.",
  "Cảm ơn anh đã review code kỹ và đưa ra nhiều feedback hữu ích. Code quality cải thiện đáng kể.",
];

function makeKudo(id: number): Kudo {
  const authorIdx = id % users.length;
  const recipientIdx = (id + 3 + Math.floor(id / 3)) % users.length;
  const safeRecipientIdx = recipientIdx === authorIdx ? (recipientIdx + 1) % users.length : recipientIdx;
  const baseDate = new Date("2025-10-30T10:00:00Z");
  baseDate.setHours(baseDate.getHours() - id * 3);

  return {
    id: `k${id}`,
    author_id: users[authorIdx].id,
    recipient_id: users[safeRecipientIdx].id,
    content: contents[id % contents.length],
    hashtags: hashtagSets[id % hashtagSets.length],
    images: [],
    hearts_count: 200 + ((id * 137 + 42) % 2000),
    created_at: baseDate.toISOString(),
    updated_at: baseDate.toISOString(),
    category: categories[id % categories.length],
    author: users[authorIdx],
    recipient: users[safeRecipientIdx],
  };
}

// 30 kudos — sorted by hearts descending
export const MOCK_KUDOS: Kudo[] = Array.from({ length: 30 }, (_, i) => makeKudo(i + 1))
  .sort((a, b) => b.hearts_count - a.hearts_count);
