import { PORTRAIT_ASSET } from "./assets";

export const ABOUT_DATA = {
  sectionTitle: "GIỚI THIỆU",
  fullName: "NGUYỄN TRUNG KIÊN - KINKUN",
  role: "Truyền thông đa phương tiện",
  paragraphs: [
    "Tôi là một người trẻ theo đuổi lĩnh vực truyền thông đa phương tiện, với sự quan tâm đặc biệt đến hình ảnh, nhiếp ảnh và nghệ thuật kể chuyện bằng video.",
    "Tôi yêu thích việc khám phá những góc nhìn mới, thử nghiệm ý tưởng và biến những cảm hứng sáng tạo thành sản phẩm trực quan.",
    "Đối với tôi, mỗi hình ảnh không chỉ đơn thuần là một khung hình, mà còn là cách truyền tải cảm xúc, góc nhìn và câu chuyện riêng.",
  ] as readonly string[],
  portrait: PORTRAIT_ASSET,
  nextAction: {
    label: "KHÁM PHÁ KỸ NĂNG", // hoặc nhãn hiện tại của bạn
    ariaLabel: "Cuộn xuống phần kỹ năng chuyên môn",
    targetHref: "#skills",
  },
} as const;
