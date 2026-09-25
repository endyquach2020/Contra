import { Lesson } from '../types';

export const TOPIC_CATEGORIES = [
  { id: 'all', name: 'Tất cả chủ đề', icon: '🌟', count: 0 },
  { id: 'nature', name: 'Tự nhiên & Khoa học', icon: '🌿', count: 0 },
  { id: 'social', name: 'Xã hội, Lịch sử & Địa lý', icon: '🏛️', count: 0 },
  { id: 'math', name: 'Toán học & Tư duy logic', icon: '🔢', count: 0 },
  { id: 'vietnamese', name: 'Tiếng Việt & Ca dao', icon: '📖', count: 0 },
  { id: 'english', name: 'Tiếng Anh (English)', icon: '🔤', count: 0 },
  { id: 'lifeskills', name: 'Kỹ năng sống & Đố mẹo', icon: '💡', count: 0 }
];

export const DEFAULT_LESSONS: Lesson[] = [
  // 1. TỰ NHIÊN & KHOA HỌC
  {
    id: 'nature-animals-wildlife',
    topic: 'Tự nhiên & Khoa học',
    subject: 'Sinh học & Động vật',
    icon: '🦁',
    badge: '10 CÂU · PHỔ BIẾN',
    title: 'Thế giới Động vật & Đại dương kỳ thú',
    description: 'Khám phá tập tính, bí ẩn động vật hoang dã và sinh vật biển sâu.',
    questions: [
      {
        id: 'nat-q1',
        question: 'Loài động vật có vú nào to lớn nhất từng tồn tại trên Trái Đất?',
        options: ['Cá voi xanh', 'Voi châu Phi', 'Khủng long bạo chúa', 'Cá mập trắng khổng lồ'],
        correctIndex: 0,
        explanation: 'Cá voi xanh là loài động vật lớn nhất từng được biết đến, có thể dài hơn 30 mét và nặng tới 180 tấn.'
      },
      {
        id: 'nat-q2',
        question: 'Động vật nào sau đây chạy nhanh nhất trên đất liền?',
        options: ['Sư tử', 'Ngựa vằn', 'Báo săn (Cheetah)', 'Linh dương'],
        correctIndex: 2,
        explanation: 'Báo săn (Cheetah) có thể bứt tốc lên đến 110-120 km/h trong thời gian ngắn.'
      },
      {
        id: 'nat-q3',
        question: 'Loài chim nào bơi lặn rất giỏi nhưng hoàn toàn không biết bay?',
        options: ['Chim bồ câu', 'Chim cánh cụt', 'Chim ưng biển', 'Chim công'],
        correctIndex: 1,
        explanation: 'Chim cánh cụt có cấu tạo cánh tiến hóa thành mái chèo, thích nghi hoàn hảo với việc bơi lội ở vùng biển lạnh.'
      },
      {
        id: 'nat-q4',
        question: 'Bạch tuộc có bao nhiêu quả tim trong cơ thể?',
        options: ['1 quả tim', '2 quả tim', '3 quả tim', '4 quả tim'],
        correctIndex: 2,
        explanation: 'Bạch tuộc có 3 quả tim: 2 quả bơm máu qua mang và 1 quả bơm máu đi khắp cơ thể.'
      },
      {
        id: 'nat-q5',
        question: 'Cây xanh hấp thụ khí gì từ không khí vào ban ngày để thực hiện quang hợp?',
        options: ['Khí Oxy (O2)', 'Khí Carbonic (CO2)', 'Khí Nitơ (N2)', 'Khí Heli (He)'],
        correctIndex: 1,
        explanation: 'Cây xanh hấp thụ CO2 và nhả ra O2 qua quá trình quang hợp dưới ánh sáng mặt trời.'
      },
      {
        id: 'nat-q6',
        question: 'Loài linh trưởng nào có mã gen di truyền gần gũi nhất với con người (khoảng 98-99%)?',
        options: ['Khỉ đột', 'Tinh tinh (Chimpanzee)', 'Vượn cáo', 'Khỉ đầu chó'],
        correctIndex: 1,
        explanation: 'Tinh tinh là họ hàng linh trưởng gần gũi nhất với loài người theo nghiên cứu di truyền học.'
      },
      {
        id: 'nat-q7',
        question: 'Con vật nào có thể đổi màu da để ngụy trang và biểu lộ cảm xúc?',
        options: ['Tắc kè hoa', 'Thằn lằn cát', 'Ếch cây', 'Rắn hổ mang'],
        correctIndex: 0,
        explanation: 'Tắc kè hoa có các tế bào sắc tố đặc biệt giúp chúng biến đổi màu sắc linh hoạt.'
      },
      {
        id: 'nat-q8',
        question: 'Loài ong mật giao tiếp với nhau về vị trí của hoa bằng cách nào?',
        options: ['Phát ra tiếng vo ve', 'Nhảy múa (Waggle dance)', 'Để lại dấu vết mùi hương', 'Vẫy râu'],
        correctIndex: 1,
        explanation: 'Ong thợ biểu diễn điệu nhảy múa để chỉ góc phương hướng và cự ly của bãi hoa so với mặt trời.'
      },
      {
        id: 'nat-q9',
        question: 'Cấu tạo vỏ ốc, vỏ trai có thành phần chủ yếu từ chất khoáng nào?',
        options: ['Canxi cacbonat (CaCO3)', 'Silicon dioxide (SiO2)', 'Sắt oxit', 'Muối ăn'],
        correctIndex: 0,
        explanation: 'Vỏ trai ốc được cấu tạo chủ yếu từ Canxi cacbonat do thân mềm tiết ra.'
      },
      {
        id: 'nat-q10',
        question: 'Loài động vật nào ngủ đứng và chỉ ngủ khoảng 2-3 giờ mỗi ngày?',
        options: ['Ngựa', 'Gấu Bắc cực', 'Mèo nhà', 'Cáo đỏ'],
        correctIndex: 0,
        explanation: 'Ngựa có cấu tạo khớp gối đặc biệt khóa chặt giúp chúng ngủ đứng để luôn cảnh giác trước kẻ thù.'
      }
    ]
  },
  {
    id: 'nature-earth-space',
    topic: 'Tự nhiên & Khoa học',
    subject: 'Trái Đất & Vũ trụ',
    icon: '🪐',
    badge: '10 CÂU · KHÁM PHÁ',
    title: 'Bí ẩn Trái Đất, Thời tiết & Hệ Mặt Trời',
    description: 'Tìm hiểu về các hành tinh trong Hệ Mặt Trời, khí quyển và các hiện tượng tự nhiên.',
    questions: [
      {
        id: 'space-q1',
        question: 'Hành tinh nào gần Mặt Trời nhất trong Hệ Mặt Trời?',
        options: ['Sao Kim (Venus)', 'Sao Thủy (Mercury)', 'Sao Hỏa (Mars)', 'Trái Đất (Earth)'],
        correctIndex: 1,
        explanation: 'Sao Thủy là hành tinh nằm gần Mặt Trời nhất.'
      },
      {
        id: 'space-q2',
        question: 'Hành tinh nào có kích thước lớn nhất trong Hệ Mặt Trời?',
        options: ['Sao Mộc (Jupiter)', 'Sao Thổ (Saturn)', 'Sao Hải Vương', 'Sao Hỏa'],
        correctIndex: 0,
        explanation: 'Sao Mộc là hành tinh khí khổng lồ lớn nhất, thể tích có thể chứa hơn 1300 Trái Đất.'
      },
      {
        id: 'space-q3',
        question: 'Khí nào chiếm tỷ lệ phần trăm lớn nhất trong khí quyển Trái Đất?',
        options: ['Khí Oxy (khoảng 21%)', 'Khí Nitơ (khoảng 78%)', 'Khí Carbonic (0.04%)', 'Khí Argon'],
        correctIndex: 1,
        explanation: 'Khí Nitơ chiếm xấp xỉ 78% thể tích bầu khí quyển Trái Đất.'
      },
      {
        id: 'space-q4',
        question: 'Cầu vồng sau mưa thường xuất hiện khi có sự tán sắc của ánh sáng mặt trời qua đâu?',
        options: ['Các giọt nước mưa lơ lửng', 'Các đám mây đen', 'Tầng ozon', 'Mặt đất ẩm'],
        correctIndex: 0,
        explanation: 'Ánh sáng trắng của Mặt Trời bị khúc xạ và phản xạ qua vô số hạt nước mưa tạo thành dải quang phổ 7 màu rực rỡ.'
      },
      {
        id: 'space-q5',
        question: 'Hiện tượng ngày và đêm trên Trái Đất xảy ra là do:',
        options: [
          'Trái Đất tự quay quanh trục của nó',
          'Trái Đất quay quanh Mặt Trời',
          'Mặt Trời quay quanh Trái Đất',
          'Mặt Trăng che khuất Mặt Trời'
        ],
        correctIndex: 0,
        explanation: 'Do Trái Đất tự quay quanh trục từ Tây sang Đông nên tạo ra chu kỳ ngày và đêm luân phiên.'
      },
      {
        id: 'space-q6',
        question: 'Hành tinh nào được mệnh danh là “Hành tinh Đỏ” do bề mặt chứa nhiều oxit sắt?',
        options: ['Sao Hỏa (Mars)', 'Sao Kim (Venus)', 'Sao Thổ (Saturn)', 'Sao Thủy (Mercury)'],
        correctIndex: 0,
        explanation: 'Sao Hỏa có màu đỏ cam đặc trưng do bề mặt phủ đầy bụi oxit sắt (rỉ sét).'
      },
      {
        id: 'space-q7',
        question: 'Đại dương nào chiếm diện tích và thể tích lớn nhất trên Trái Đất?',
        options: ['Thái Bình Dương', 'Đại Tây Dương', 'Ấn Độ Dương', 'Bắc Băng Dương'],
        correctIndex: 0,
        explanation: 'Thái Bình Dương là đại dương lớn nhất, bao phủ hơn 30% diện tích bề mặt Trái Đất.'
      },
      {
        id: 'space-q8',
        question: 'Lực nào giữ cho các hành tinh quay quanh Mặt Trời và giữ chúng ta đứng trên mặt đất?',
        options: ['Lực hấp dẫn (Trọng lực)', 'Lực từ trường', 'Lực ma sát', 'Lực đẩy Ac-si-met'],
        correctIndex: 0,
        explanation: 'Lực hấp dẫn là lực hút giữa mọi vật có khối lượng trong vũ trụ.'
      },
      {
        id: 'space-q9',
        question: 'Nước sôi ở điều kiện áp suất tiêu chuẩn tại nhiệt độ bao nhiêu độ C?',
        options: ['90°C', '100°C', '120°C', '80°C'],
        correctIndex: 1,
        explanation: 'Ở áp suất khí quyển tiêu chuẩn 1 atm, nước sôi tại 100°C.'
      },
      {
        id: 'space-q10',
        question: 'Hiện tượng thủy triều lên xuống ở các vùng biển chủ yếu do lực hút của thiên thể nào?',
        options: ['Mặt Trăng', 'Sao Hỏa', 'Sao Mộc', 'Sao Bắc Đẩu'],
        correctIndex: 0,
        explanation: 'Lực hấp dẫn của Mặt Trăng (kết hợp với Mặt Trời) tác động lên các khối nước đại dương tạo nên thủy triều.'
      }
    ]
  },

  // 2. XÃ HỘI, LỊCH SỬ & ĐỊA LÝ
  {
    id: 'social-vietnam-geography',
    topic: 'Xã hội, Lịch sử & Địa lý',
    subject: 'Địa lý & Đất nước',
    icon: '🗺️',
    badge: '10 CÂU · ĐẤT NƯỚC',
    title: 'Danh lam thắng cảnh & Đất nước Việt Nam',
    description: 'Hành trình khám phá 63 tỉnh thành, các di sản thế giới và vẻ đẹp non sông gấm vóc.',
    questions: [
      {
        id: 'geo-q1',
        question: 'Thủ đô của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam là thành phố nào?',
        options: ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Huế'],
        correctIndex: 0,
        explanation: 'Hà Nội là thủ đô ngàn năm văn hiến của nước Việt Nam.'
      },
      {
        id: 'geo-q2',
        question: 'Đỉnh núi nào được mệnh danh là “Nóc nhà Đông Dương” nằm tại Sa Pa, Lào Cai?',
        options: ['Fansipan (Phan-xi-păng)', 'Bà Nà', 'Langbiang', 'Bạch Mộc Lương Tử'],
        correctIndex: 0,
        explanation: 'Đỉnh Fansipan cao 3.143 mét là đỉnh núi cao nhất Việt Nam và cả 3 nước Đông Dương.'
      },
      {
        id: 'geo-q3',
        question: 'Vịnh biển nào của Việt Nam hai lần được UNESCO công nhận là Di sản Thiên nhiên Thế giới?',
        options: ['Vịnh Hạ Long', 'Vịnh Nha Trang', 'Vịnh Cam Ranh', 'Vịnh Vĩnh Hy'],
        correctIndex: 0,
        explanation: 'Vịnh Hạ Long (Quảng Ninh) nổi tiếng thế giới với hàng nghìn hòn đảo đá vôi kỳ vĩ.'
      },
      {
        id: 'geo-q4',
        question: 'Dòng sông nào dài nhất chảy qua nhiều quốc gia và đổ ra biển Đông tại Đồng bằng sông Cửu Long?',
        options: ['Sông Mê Kông', 'Sông Hồng', 'Sông Đồng Nai', 'Sông Mã'],
        correctIndex: 0,
        explanation: 'Sông Mê Kông chảy qua 6 quốc gia và khi vào Việt Nam chia thành 9 nhánh tạo nên châu thổ Cửu Long.'
      },
      {
        id: 'geo-q5',
        question: 'Đảo nào có diện tích lớn nhất Việt Nam, được mệnh danh là “Đảo Ngọc”?',
        options: ['Đảo Phú Quốc', 'Đảo Cát Bà', 'Đảo Côn Đảo', 'Đảo Lý Sơn'],
        correctIndex: 0,
        explanation: 'Phú Quốc (thuộc tỉnh Kiên Giang) là hòn đảo lớn nhất Việt Nam.'
      },
      {
        id: 'geo-q6',
        question: 'Quần thể hang động tự nhiên lớn nhất thế giới được phát hiện tại Vườn quốc gia Phong Nha - Kẻ Bàng là hang gì?',
        options: ['Hang Sơn Đoòng', 'Hang Én', 'Động Thiên Đường', 'Hang Va'],
        correctIndex: 0,
        explanation: 'Hang Sơn Đoòng (Quảng Bình) là hang động tự nhiên lớn nhất thế giới, chứa được cả tòa nhà chọc trời.'
      },
      {
        id: 'geo-q7',
        question: 'Việt Nam có đường bờ biển dài khoảng bao nhiêu km uốn lượn hình chữ S?',
        options: ['Khoảng 3.260 km', 'Khoảng 2.500 km', 'Khoảng 4.200 km', 'Khoảng 1.800 km'],
        correctIndex: 0,
        explanation: 'Đường bờ biển Việt Nam dài 3.260 km trải dài từ Móng Cái (Quảng Ninh) đến Hà Tiên (Kiên Giang).'
      },
      {
        id: 'geo-q8',
        question: 'Cố đô Huế nổi tiếng với dòng sông thơ mộng nào chảy qua lòng thành phố?',
        options: ['Sông Hương', 'Sông Hàn', 'Sông Hoài', 'Sông Lam'],
        correctIndex: 0,
        explanation: 'Sông Hương (Hương Giang) núi Ngự là biểu tượng văn hóa trữ tình của đất Cố đô Huế.'
      },
      {
        id: 'geo-q9',
        question: 'Cao nguyên đá Đồng Văn - Công viên địa chất toàn cầu nằm ở tỉnh địa đầu phía Bắc nào?',
        options: ['Hà Giang', 'Cao Bằng', 'Lạng Sơn', 'Yên Bái'],
        correctIndex: 0,
        explanation: 'Cao nguyên đá Đồng Văn thuộc tỉnh Hà Giang, nơi có cột cờ Lũng Cú cực Bắc Tổ quốc.'
      },
      {
        id: 'geo-q10',
        question: 'Thành phố nào của nước ta được mệnh danh là “Thành phố ngàn hoa” với khí hậu mát mẻ quanh năm?',
        options: ['Đà Lạt', 'Sa Pa', 'Buôn Ma Thuột', 'Pleiku'],
        correctIndex: 0,
        explanation: 'Đà Lạt (Lâm Đồng) nằm trên cao nguyên Lâm Viên với muôn ngàn loài hoa nở quanh năm.'
      }
    ]
  },
  {
    id: 'social-vietnam-history',
    topic: 'Xã hội, Lịch sử & Địa lý',
    subject: 'Lịch sử hào hùng',
    icon: '⚔️',
    badge: '10 CÂU · HÀO HÙNG',
    title: 'Lịch sử Hào hùng & Anh hùng Dân tộc',
    description: 'Ôn lại những trang sử vẻ vang, các chiến công hiển hách dựng nước và giữ nước.',
    questions: [
      {
        id: 'his-q1',
        question: 'Ai là người lãnh đạo nhân dân đánh tan quân Nam Hán trên sông Bạch Đằng năm 938, mở ra kỷ nguyên độc lập lâu dài?',
        options: ['Ngô Quyền', 'Đinh Bộ Lĩnh', 'Lê Hoàn', 'Lý Thường Kiệt'],
        correctIndex: 0,
        explanation: 'Ngô Quyền đã dùng kế cắm cọc gỗ bịt sắt trên sông Bạch Đằng đánh tan quân xâm lược năm 938.'
      },
      {
        id: 'his-q2',
        question: 'Vị vua nào đã ban chiếu dời đô từ Hoa Lư về Thăng Long (Hà Nội ngày nay) vào năm 1010?',
        options: ['Lý Công Uẩn (Lý Thái Tổ)', 'Lý Nhân Tông', 'Trần Hưng Đạo', 'Lê Thái Tổ'],
        correctIndex: 0,
        explanation: 'Năm 1010, vua Lý Thái Tổ thấy rồng vàng bay lên nên đặt tên kinh đô mới là Thăng Long.'
      },
      {
        id: 'his-q3',
        question: 'Vị tướng kiệt xuất nào 3 lần chỉ huy quân dân nhà Trần đánh tan giặc Mông - Nguyên xâm lược?',
        options: ['Trần Hưng Đạo (Trần Quốc Tuấn)', 'Trần Quang Khải', 'Trần Khánh Dư', 'Phạm Ngũ Lão'],
        correctIndex: 0,
        explanation: 'Hưng Đạo Đại vương Trần Quốc Tuấn là vị chỉ huy quân sự thiên tài của triều Trần.'
      },
      {
        id: 'his-q4',
        question: 'Hai vị nữ tướng đầu tiên trong lịch sử khởi nghĩa chống giặc Đông Hán giành lại chủ quyền cho dân tộc là ai?',
        options: ['Hai Bà Trưng (Trưng Trắc, Trưng Nhị)', 'Bà Triệu', 'Nguyễn Thị Định', 'Bùi Thị Xuân'],
        correctIndex: 0,
        explanation: 'Cuộc khởi nghĩa Hai Bà Trưng năm 40 sau Công nguyên đã phất cờ khởi nghĩa giành lại 65 thành trì.'
      },
      {
        id: 'his-q5',
        question: 'Người anh hùng thiếu niên bóp nát quả cam vì không được dự bàn việc đánh giặc tại hội nghị Bình Than là ai?',
        options: ['Trần Quốc Toản', 'Kim Đồng', 'Võ Thị Sáu', 'Lê Văn Tám'],
        correctIndex: 0,
        explanation: 'Trần Quốc Toản vì tuổi nhỏ không được dự họp nên tức giận bóp nát quả cam, sau đó thêu cờ sáu chữ vàng ra trận.'
      },
      {
        id: 'his-q6',
        question: 'Vua Quang Trung (Nguyễn Huệ) đại phá 29 vạn quân Mãn Thanh xâm lược vang dội vào dịp nào?',
        options: ['Tết Kỷ Dậu (năm 1789)', 'Mùa hè năm 1785', 'Mùa thu năm 1792', 'Tết Nguyên tiêu 1780'],
        correctIndex: 0,
        explanation: 'Vua Quang Trung hành quân thần tốc tiến vào Thăng Long đại phá quân Thanh vào Tết Kỷ Dậu 1789 với trận Ngọc Hồi - Đống Đa.'
      },
      {
        id: 'his-q7',
        question: 'Chiến thắng “Lừng lẫy năm châu, chấn động địa cầu” năm 1954 của nhân dân ta là chiến dịch nào?',
        options: ['Chiến dịch Điện Biên Phủ', 'Chiến dịch Tây Bắc', 'Chiến dịch Việt Bắc', 'Chiến dịch Biên Giới'],
        correctIndex: 0,
        explanation: 'Chiến thắng Điện Biên Phủ ngày 7/5/1954 đã đập tan tập đoàn cứ điểm mạnh nhất của thực dân Pháp.'
      },
      {
        id: 'his-q8',
        question: 'Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa vào ngày nào?',
        options: ['Ngày 2 tháng 9 năm 1945', 'Ngày 19 tháng 8 năm 1945', 'Ngày 30 tháng 4 năm 1975', 'Ngày 1 tháng 1 năm 1946'],
        correctIndex: 0,
        explanation: 'Ngày 2/9/1945 tại Quảng trường Ba Đình (Hà Nội), Bác Hồ đã đọc bản Tuyên ngôn Độc lập thiêng liêng.'
      },
      {
        id: 'his-q9',
        question: 'Địa đạo Củ Chi - hệ thống công trình phòng thủ dưới lòng đất huyền thoại nằm ở địa phương nào?',
        options: ['TP. Hồ Chí Minh', 'Đồng Nai', 'Bình Dương', 'Tây Ninh'],
        correctIndex: 0,
        explanation: 'Địa đạo Củ Chi tại TP. Hồ Chí Minh dài hơn 200 km xuyên qua lòng đất là kỳ tích quân sự độc đáo.'
      },
      {
        id: 'his-q10',
        question: 'Trường Đại học đầu tiên của Việt Nam được thành lập năm 1076 dưới thời nhà Lý là nơi nào?',
        options: ['Quốc Tử Giám', 'Văn Miếu Thăng Long', 'Viện Hàn Lâm', 'Đông Kinh Nghĩa Thục'],
        correctIndex: 0,
        explanation: 'Quốc Tử Giám được lập năm 1076 để dạy học cho con em hoàng gia và các bậc nhân tài khắp đất nước.'
      }
    ]
  },

  // 3. TOÁN HỌC & TƯ DUY LOGIC
  {
    id: 'math-arithmetic-logic',
    topic: 'Toán học & Tư duy logic',
    subject: 'Số học & Tính nhẩm',
    icon: '⚡',
    badge: '10 CÂU · TÍNH NHANH',
    title: 'Số học & Phép tính Vui nhộn',
    description: 'Thử tài tính nhanh, giải đố logic và tư duy số học linh hoạt.',
    questions: [
      {
        id: 'mth-q1',
        question: 'Số tự nhiên nhỏ nhất có hai chữ số khác nhau là số nào?',
        options: ['10', '11', '12', '01'],
        correctIndex: 0,
        explanation: 'Số 10 gồm chữ số 1 và 0 khác nhau, là số tự nhiên có hai chữ số khác nhau nhỏ nhất.'
      },
      {
        id: 'mth-q2',
        question: 'Kết quả của phép tính: 25 × 4 - 30 là bao nhiêu?',
        options: ['70', '60', '80', '90'],
        correctIndex: 0,
        explanation: '25 × 4 = 100. Sau đó 100 - 30 = 70.'
      },
      {
        id: 'mth-q3',
        question: 'Một hình vuông có cạnh dài 6 cm. Chu vi của hình vuông đó là:',
        options: ['24 cm', '36 cm', '18 cm', '12 cm'],
        correctIndex: 0,
        explanation: 'Chu vi hình vuông = Cạnh × 4 = 6 × 4 = 24 cm.'
      },
      {
        id: 'mth-q4',
        question: 'Số nào sau đây vừa chia hết cho 2 vừa chia hết cho 5?',
        options: ['15', '24', '50', '35'],
        correctIndex: 2,
        explanation: 'Số chia hết cho cả 2 và 5 phải có tận cùng là chữ số 0. Do đó số 50 thỏa mãn.'
      },
      {
        id: 'mth-q5',
        question: 'Tìm x biết: x + 45 = 100',
        options: ['x = 55', 'x = 65', 'x = 45', 'x = 145'],
        correctIndex: 0,
        explanation: 'x = 100 - 45 = 55.'
      },
      {
        id: 'mth-q6',
        question: 'Một đàn vịt có 18 con, trong đó một nửa là vịt trắng. Hỏi có bao nhiêu con vịt trắng?',
        options: ['9 con', '6 con', '12 con', '8 con'],
        correctIndex: 0,
        explanation: 'Một nửa của 18 là 18 : 2 = 9 con vịt trắng.'
      },
      {
        id: 'mth-q7',
        question: 'Một ngày có bao nhiêu giờ đồng hồ?',
        options: ['12 giờ', '24 giờ', '48 giờ', '60 giờ'],
        correctIndex: 1,
        explanation: 'Một ngày trọn vẹn có đúng 24 giờ.'
      },
      {
        id: 'mth-q8',
        question: 'Số lớn nhất có ba chữ số là số nào?',
        options: ['999', '1000', '990', '900'],
        correctIndex: 0,
        explanation: '999 là số tự nhiên lớn nhất có 3 chữ số.'
      },
      {
        id: 'mth-q9',
        question: 'Phân số 1/2 tương đương với bao nhiêu phần trăm (%)?',
        options: ['25%', '50%', '75%', '100%'],
        correctIndex: 1,
        explanation: '1/2 = 50/100 = 50%.'
      },
      {
        id: 'mth-q10',
        question: 'Trong dãy số: 2, 4, 8, 16, ... số tiếp theo theo quy luật nhân đôi là:',
        options: ['24', '32', '30', '64'],
        correctIndex: 1,
        explanation: 'Quy luật nhân đôi: 16 × 2 = 32.'
      }
    ]
  },
  {
    id: 'math-geometry-puzzles',
    topic: 'Toán học & Tư duy logic',
    subject: 'Hình học & Tư duy',
    icon: '📐',
    badge: '10 CÂU · HÌNH HỌC',
    title: 'Hình học & Câu đố Trí tuệ Logic',
    description: 'Rèn luyện khả năng quan sát không gian, tính diện tích và giải đố thông minh.',
    questions: [
      {
        id: 'geo-m1',
        question: 'Hình tam giác đều có bao nhiêu góc và số đo mỗi góc là bao nhiêu?',
        options: ['3 góc, mỗi góc 60°', '3 góc, mỗi góc 90°', '4 góc, mỗi góc 45°', '3 góc, mỗi góc 45°'],
        correctIndex: 0,
        explanation: 'Tam giác đều có 3 cạnh bằng nhau và 3 góc bằng nhau, mỗi góc bằng 180° : 3 = 60°.'
      },
      {
        id: 'geo-m2',
        question: 'Một khối lập phương có tất cả bao nhiêu mặt?',
        options: ['4 mặt', '6 mặt', '8 mặt', '12 mặt'],
        correctIndex: 1,
        explanation: 'Khối lập phương có đúng 6 mặt đều là các hình vuông bằng nhau.'
      },
      {
        id: 'geo-m3',
        question: 'Diện tích hình chữ nhật có chiều dài 8 m và chiều rộng 5 m là:',
        options: ['40 m²', '26 m²', '13 m²', '80 m²'],
        correctIndex: 0,
        explanation: 'Diện tích = Dài × Rộng = 8 × 5 = 40 m².'
      },
      {
        id: 'geo-m4',
        question: 'Đường thẳng nối tâm đường tròn với một điểm trên đường tròn gọi là gì?',
        options: ['Bán kính', 'Đường kính', 'Dây cung', 'Tiếp tuyến'],
        correctIndex: 0,
        explanation: 'Đoạn thẳng nối tâm với một điểm trên đường tròn chính là bán kính (r).'
      },
      {
        id: 'geo-m5',
        question: 'Góc vuông có số đo bằng bao nhiêu độ?',
        options: ['90°', '180°', '60°', '45°'],
        correctIndex: 0,
        explanation: 'Góc vuông có số đo chính xác là 90 độ.'
      },
      {
        id: 'geo-m6',
        question: 'Một khúc gỗ dài 10 mét. Cứ mỗi lần cưa mất 2 phút và cắt được khúc 2 mét. Hỏi cưa hết khúc gỗ mất mấy phút?',
        options: ['10 phút', '8 phút', '6 phút', '12 phút'],
        correctIndex: 1,
        explanation: 'Để chia cây gỗ 10m thành các đoạn 2m cần 4 nhát cưa. 4 nhát × 2 phút = 8 phút (nhát thứ 4 tạo ra cả khúc thứ 4 và thứ 5).'
      },
      {
        id: 'geo-m7',
        question: 'Hình tròn có bao nhiêu cạnh thẳng?',
        options: ['0 cạnh', '1 cạnh', 'Vô số cạnh', '4 cạnh'],
        correctIndex: 0,
        explanation: 'Hình tròn được giới hạn bởi đường cong khép kín, không có cạnh thẳng nào.'
      },
      {
        id: 'geo-m8',
        question: 'Tổng ba góc trong một hình tam giác bất kỳ luôn bằng bao nhiêu độ?',
        options: ['180°', '360°', '90°', '270°'],
        correctIndex: 0,
        explanation: 'Tổng số đo 3 góc trong mọi tam giác phẳng luôn bằng 180°.'
      },
      {
        id: 'geo-m9',
        question: 'Có 3 quả táo trên bàn, bạn lấy đi 2 quả. Hỏi bạn còn mấy quả táo?',
        options: ['Bạn còn 2 quả táo', 'Bạn còn 1 quả táo', 'Bạn còn 3 quả táo', 'Bạn còn 0 quả'],
        correctIndex: 0,
        explanation: 'Đố mẹo: BẠN LẤY ĐI 2 quả táo, vậy trong tay bạn có chính 2 quả táo đó!'
      },
      {
        id: 'geo-m10',
        question: 'Hình lục giác đều có bao nhiêu cạnh bằng nhau?',
        options: ['5 cạnh', '6 cạnh', '7 cạnh', '8 cạnh'],
        correctIndex: 1,
        explanation: 'Lục giác đều là đa giác có đúng 6 cạnh bằng nhau.'
      }
    ]
  },

  // 4. TIẾNG VIỆT & CA DAO DÂN GIAN
  {
    id: 'viet-proverbs-riddles',
    topic: 'Tiếng Việt & Ca dao',
    subject: 'Ca dao tục ngữ',
    icon: '🎋',
    badge: '10 CÂU · ĐỐ CHỮ',
    title: 'Ca dao, Tục ngữ & Đố chữ Dân gian',
    description: 'Khám phá sự giàu đẹp, tinh tế và kho tàng trí tuệ dân gian của tiếng Việt.',
    questions: [
      {
        id: 'viet-q1',
        question: 'Điền từ còn thiếu vào câu ca dao: “Công cha như núi Thái Sơn / Nghĩa mẹ như nước trong ... chảy ra”?',
        options: ['nguồn', 'biển', 'suối', 'sông'],
        correctIndex: 0,
        explanation: 'Câu ca dao trọn vẹn: “Công cha như núi Thái Sơn, Nghĩa mẹ như nước trong nguồn chảy ra”.'
      },
      {
        id: 'viet-q2',
        question: 'Câu tục ngữ: “Uống nước nhớ ...” nhắc nhở chúng ta về lòng biết ơn?',
        options: ['nguồn', 'rừng', 'biển', 'sông'],
        correctIndex: 0,
        explanation: 'Tục ngữ Việt Nam: “Uống nước nhớ nguồn” răn dạy đạo lý tri ân cội nguồn.'
      },
      {
        id: 'viet-q3',
        question: 'Đố chữ: “Để nguyên lấp lánh trên trời / Bỏ đầu thành quả ngọt ngào thơm ngon” là chữ gì?',
        options: ['Chữ SAO (bỏ S thành AO)', 'Chữ TRĂNG', 'Chữ MÂY', 'Chữ NẮNG'],
        correctIndex: 0,
        explanation: 'Để nguyên là SAO (ngôi sao trên trời), bỏ chữ cái đầu S thành AO (hoặc đố quả: SAO - Bỏ S thành TÁO nếu thêm dấu, hoặc NHO).'
      },
      {
        id: 'viet-q4',
        question: 'Từ nào sau đây là từ láy tượng thanh mô tả tiếng chim hót vui tươi?',
        options: ['Ríu rít', 'Xanh xao', 'Long lanh', 'Ầm ầm'],
        correctIndex: 0,
        explanation: '“Ríu rít” là từ láy mô phỏng âm thanh tiếng chim chóc hót rộn ràng.'
      },
      {
        id: 'viet-q5',
        question: 'Cặp từ nào sau đây là cặp từ trái nghĩa?',
        options: ['Chăm chỉ - Lười biếng', 'Thông minh - Khôn ngoan', 'Cao lớn - Khổng lồ', 'Vui vẻ - Hân hoan'],
        correctIndex: 0,
        explanation: '“Chăm chỉ” và “Lười biếng” là hai trạng thái hành vi đối lập nhau hoàn toàn.'
      },
      {
        id: 'viet-q6',
        question: 'Điền từ thích hợp: “Học thầy không tày học ...”?',
        options: ['bạn', 'sách', 'đời', 'mẹ'],
        correctIndex: 0,
        explanation: 'Tục ngữ: “Học thầy không tày học bạn” đề cao việc học hỏi từ bạn bè xung quanh.'
      },
      {
        id: 'viet-q7',
        question: 'Trong câu: “Bác nông dân đang cày ruộng”, từ “cày” đóng vai trò là từ loại gì?',
        options: ['Động từ', 'Danh từ', 'Tính từ', 'Đại từ'],
        correctIndex: 0,
        explanation: '“Cày” chỉ hành động lao động của con người, nên là Động từ.'
      },
      {
        id: 'viet-q8',
        question: 'Dấu câu nào dùng để kết thúc một câu hỏi trong tiếng Việt?',
        options: ['Dấu chấm hỏi (?)', 'Dấu chấm than (!)', 'Dấu chấm (.)', 'Dấu phẩy (,)'],
        correctIndex: 0,
        explanation: 'Dấu chấm hỏi (?) được đặt ở cuối câu nghi vấn/câu hỏi.'
      },
      {
        id: 'viet-q9',
        question: 'Câu tục ngữ nào nói về tinh thần đoàn kết, tương thân tương ái của dân tộc ta?',
        options: [
          'Lá lành đùm lá rách',
          'Ăn vóc học hay',
          'Thất bại là mẹ thành công',
          'Trăm hay không bằng tay quen'
        ],
        correctIndex: 0,
        explanation: '“Lá lành đùm lá rách” thể hiện lòng nhân ái, giúp đỡ cưu mang lẫn nhau khi hoạn nạn.'
      },
      {
        id: 'viet-q10',
        question: 'Chữ cái nào đứng đầu trong bảng chữ cái tiếng Việt hiện đại?',
        options: ['Chữ A', 'Chữ B', 'Chữ C', 'Chữ D'],
        correctIndex: 0,
        explanation: 'Bảng chữ cái tiếng Việt bắt đầu bằng nguyên âm A.'
      }
    ]
  },

  // 5. TIẾNG ANH (ENGLISH FOR KIDS & COMMUNICATIVE)
  {
    id: 'english-vocabulary-kids',
    topic: 'Tiếng Anh (English)',
    subject: 'Vocabulary & Phrases',
    icon: '🇬🇧',
    badge: '10 CÂU · TỪ VỰNG',
    title: 'English Vocabulary: Animals, Colors & Family',
    description: 'Rèn luyện phản xạ từ vựng tiếng Anh giao tiếp cơ bản và thú vị.',
    questions: [
      {
        id: 'eng-q1',
        question: "Trong tiếng Anh, 'Con voi' được gọi là gì?",
        options: ['Elephant', 'Lion', 'Tiger', 'Monkey'],
        correctIndex: 0,
        explanation: 'Elephant nghĩa là con voi.'
      },
      {
        id: 'eng-q2',
        question: "Màu nào sau đây trong tiếng Anh gọi là 'Yellow'?",
        options: ['Màu vàng', 'Màu xanh lá', 'Màu đỏ', 'Màu tím'],
        correctIndex: 0,
        explanation: 'Yellow nghĩa là màu vàng.'
      },
      {
        id: 'eng-q3',
        question: "Từ nào dùng để chào hỏi lịch sự vào buổi sáng bằng tiếng Anh?",
        options: ['Good morning', 'Good night', 'Goodbye', 'Good afternoon'],
        correctIndex: 0,
        explanation: 'Good morning là lời chào buổi sáng quen thuộc.'
      },
      {
        id: 'eng-q4',
        question: "Số 'Twelve' trong tiếng Anh biểu thị chữ số nào?",
        options: ['Số 12', 'Số 20', 'Số 2', 'Số 11'],
        correctIndex: 0,
        explanation: 'Twelve là số 12.'
      },
      {
        id: 'eng-q5',
        question: "Đồ vật dùng để viết bài trong lớp học được gọi là 'Pen' hoặc 'Pencil'. Vậy 'Pencil' là gì?",
        options: ['Bút chì', 'Bút mực', 'Cục tẩy', 'Thước kẻ'],
        correctIndex: 0,
        explanation: 'Pencil là bút chì, Pen là bút bi/mực.'
      },
      {
        id: 'eng-q6',
        question: "Để nói lời cảm ơn ai đó bằng tiếng Anh, chúng ta thường nói câu gì?",
        options: ['Thank you very much', 'You are welcome', 'I am sorry', 'Excuse me'],
        correctIndex: 0,
        explanation: 'Thank you có nghĩa là cảm ơn bạn.'
      },
      {
        id: 'eng-q7',
        question: "Từ 'Teacher' trong trường học có nghĩa là ai?",
        options: ['Thầy/Cô giáo', 'Học sinh', 'Bác bảo vệ', 'Bác sĩ'],
        correctIndex: 0,
        explanation: 'Teacher là giáo viên / thầy cô giáo.'
      },
      {
        id: 'eng-q8',
        question: "Trái cây màu đỏ ngọt ngào, tiếng Anh gọi là 'Apple' nghĩa là quả gì?",
        options: ['Quả táo', 'Quả chuối', 'Quả cam', 'Quả xoài'],
        correctIndex: 0,
        explanation: 'Apple nghĩa là quả táo.'
      },
      {
        id: 'eng-q9',
        question: "What is the opposite of 'Big' (Trái nghĩa với từ 'Big' là gì)?",
        options: ['Small', 'Tall', 'Fast', 'Heavy'],
        correctIndex: 0,
        explanation: 'Big (to lớn) trái nghĩa với Small (nhỏ bé).'
      },
      {
        id: 'eng-q10',
        question: "Mặt Trời mọc vào ban ngày và chiếu sáng rực rỡ, tiếng Anh gọi là gì?",
        options: ['Sun', 'Moon', 'Star', 'Cloud'],
        correctIndex: 0,
        explanation: 'Sun là Mặt Trời, Moon là Mặt Trăng, Star là Ngôi sao.'
      }
    ]
  },

  // 6. KỸ NĂNG SỐNG & ĐỐ MẸO
  {
    id: 'lifeskills-safety-smart',
    topic: 'Kỹ năng sống & Đố mẹo',
    subject: 'An toàn & Kỹ năng ứng biến',
    icon: '🛡️',
    badge: '10 CÂU · THIẾT THỰC',
    title: 'An toàn Giao thông, Thoát hiểm & Kỹ năng sống',
    description: 'Trang bị kiến thức tự bảo vệ bản thân, xử lý tình huống khẩn cấp và sống văn minh.',
    questions: [
      {
        id: 'life-q1',
        question: 'Khi tham gia giao thông, đèn tín hiệu chuyển sang màu ĐỎ thì người đi đường phải làm gì?',
        options: ['Dừng lại trước vạch dừng', 'Đi thật nhanh qua ngã tư', 'Bấm còi liên tục', 'Rẽ trái bất ngờ'],
        correctIndex: 0,
        explanation: 'Đèn đỏ là hiệu lệnh phải dừng lại hoàn toàn trước vạch dừng để nhường đường cho hướng ưu tiên.'
      },
      {
        id: 'life-q2',
        question: 'Khi gặp sự cố cháy nổ hoặc khói mù mịt trong nhà cao tầng, em nên di chuyển như thế nào?',
        options: [
          'Dùng khăn ướt bịt mũi miệng, cúi khom thấp người men theo tường',
          'Đứng thẳng người và chạy vào thang máy',
          'Mở toang tất cả các cửa sổ hít thở',
          'Nhảy ngay ra khỏi ban công'
        ],
        correctIndex: 0,
        explanation: 'Khói độc thường bốc lên cao; cúi khom người sát sàn và dùng khăn ướt che mũi miệng giúp tránh hít phải khí độc CO.'
      },
      {
        id: 'life-q3',
        question: 'Số điện thoại khẩn cấp nào dùng để gọi Cảnh sát Phòng cháy Chữa cháy & Cứu nạn cứu hộ tại Việt Nam?',
        options: ['114', '113', '115', '111'],
        correctIndex: 0,
        explanation: '114 là số gọi Cứu hỏa; 113 là Cảnh sát trật tự; 115 là Cấp cứu y tế; 111 là Đường dây bảo vệ trẻ em.'
      },
      {
        id: 'life-q4',
        question: 'Khi đi xe máy hoặc xe đạp điện cùng cha mẹ, hành động nào là bắt buộc để đảm bảo an toàn vùng đầu?',
        options: ['Đội mũ bảo hiểm cài quai đúng cách', 'Đeo kính râm', 'Mặc áo mưa dày', 'Cầm ô che nắng'],
        correctIndex: 0,
        explanation: 'Mũ bảo hiểm đạt chuẩn bảo vệ hộp sọ giảm chấn thương nghiêm trọng khi xảy ra va chạm.'
      },
      {
        id: 'life-q5',
        question: 'Nếu người lạ cho bánh kẹo hoặc rủ đi chơi khi em đang đứng đợi người thân, em nên làm gì?',
        options: [
          'Lịch sự từ chối và tìm đến chỗ đông người hoặc chú công an/bảo vệ',
          'Ăn ngay bánh kẹo và đi theo họ',
          'Im lặng đi theo họ xem có gì hay',
          'Lên xe của họ ngay'
        ],
        correctIndex: 0,
        explanation: 'Quy tắc an toàn: Không nhận quà, bánh kẹo hay đi theo người lạ để phòng tránh bị lừa đảo, bắt cóc.'
      },
      {
        id: 'life-q6',
        question: 'Trước khi ăn cơm và sau khi đi vệ sinh, chúng ta cần làm gì để phòng chống vi khuẩn gây bệnh?',
        options: ['Rửa tay sạch sẽ bằng xà phòng và nước sạch', 'Chỉ cần lau tay vào quần áo', 'Thổi nhẹ vào tay', 'Uống một ngụm nước'],
        correctIndex: 0,
        explanation: 'Rửa tay với xà phòng trong ít nhất 20-30 giây loại bỏ hầu hết vi khuẩn có hại.'
      },
      {
        id: 'life-q7',
        question: 'Biển báo giao thông có hình tròn, viền đỏ, nền trắng là nhóm biển báo gì?',
        options: ['Biển báo cấm', 'Biển chỉ dẫn', 'Biển cảnh báo nguy hiểm', 'Biển hiệu lệnh'],
        correctIndex: 0,
        explanation: 'Hình tròn viền đỏ nền trắng là nhóm biển báo CẤM các phương tiện hoặc hành vi nhất định.'
      },
      {
        id: 'life-q8',
        question: 'Khi gặp một người bị đuối nước dưới ao hồ, hành động sơ cứu ĐÚNG NHẤT của học sinh là gì?',
        options: [
          'Hô hoán thật to tìm người lớn cứu giúp, ném phao hoặc cành cây cho người bị nạn',
          'Tự nhảy ngay xuống nước dù không biết bơi',
          'Đứng quay video bằng điện thoại',
          'Bỏ chạy về nhà không nói với ai'
        ],
        correctIndex: 0,
        explanation: 'Học sinh không được tự ý nhảy xuống nước mà phải lập tức tri hô người lớn và quăng phao, cành cây hỗ trợ từ bờ.'
      },
      {
        id: 'life-q9',
        question: 'Đố mẹo: Cái gì của bạn nhưng người khác lại dùng nó nhiều hơn bạn?',
        options: ['Tên của bạn', 'Đôi giày của bạn', 'Chiếc xe của bạn', 'Cái cặp sách của bạn'],
        correctIndex: 0,
        explanation: 'Tên của bạn thuộc về bạn, nhưng mọi người xung quanh gọi nó thường xuyên hơn chính bạn gọi.'
      },
      {
        id: 'life-q10',
        question: 'Để giữ gìn môi trường xanh - sạch - đẹp, rác thải nhựa như túi nilon, chai nhựa cần được:',
        options: [
          'Thu gom phân loại và tái chế, hạn chế vứt bừa bãi',
          'Vứt trực tiếp xuống cống rãnh',
          'Ném bừa bãi ra công viên',
          'Đốt ngay tại chỗ'
        ],
        correctIndex: 0,
        explanation: 'Phân loại và tái chế rác nhựa giúp bảo vệ nguồn đất, nước và sức khỏe cộng đồng.'
      }
    ]
  }
];
