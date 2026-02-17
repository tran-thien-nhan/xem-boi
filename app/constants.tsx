
import { TarotCard } from './types';

export const TAROT_DECK: TarotCard[] = [
    {
        id: '0', name: 'The Fool', arcana: 'Major',
        meaningUpright: 'Khởi đầu mới, ngây thơ, tự phát, tinh thần tự do',
        meaningReversed: 'Liều lĩnh, bất cẩn, do dự, dại dột',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNGvRmEaQb1XXcOlQFfXbHPCeYEZvSTGd1ww&s',
        description: 'Kẻ khờ đứng bên bờ vực, sẵn sàng cho một cuộc hành trình mới.'
    },
    {
        id: '1', name: 'The Magician', arcana: 'Major',
        meaningUpright: 'Sức mạnh, hành động khéo léo, ý chí, tập trung',
        meaningReversed: 'Thao túng, kế hoạch tồi, tài năng bị lãng phí',
        imageUrl: 'https://tarot.vn/wp-content/uploads/2014/07/1-Magician-icon.png',
        description: 'Bậc thầy của các nguyên tố, biến ý chí thành hiện thực.'
    },
    {
        id: '2', name: 'The High Priestess', arcana: 'Major',
        meaningUpright: 'Trực giác, bí ẩn, tâm linh, tiềm thức',
        meaningReversed: 'Bí mật bị tiết lộ, mất kết nối bản thân, hời hợt',
        imageUrl: 'https://hoctarot.com/wp-content/uploads/2020/01/maj02.jpg',
        description: 'Người giữ chìa khóa của những bí ẩn thiêng liêng.'
    },
    {
        id: '3', name: 'The Empress', arcana: 'Major',
        meaningUpright: 'Nữ tính, vẻ đẹp, thiên nhiên, sự nuôi dưỡng',
        meaningReversed: 'Sự phụ thuộc, ngột ngạt, thiếu sáng tạo',
        imageUrl: 'https://acudenver.com/wp-content/uploads/2024/11/tarotempress.jpg',
        description: 'Đại diện cho đất mẹ và sự phong phú của cuộc sống.'
    },
    {
        id: '4', name: 'The Emperor', arcana: 'Major',
        meaningUpright: 'Quyền lực, cấu trúc, kiểm soát, kỷ luật',
        meaningReversed: 'Chuyên chế, cứng nhắc, thiếu kiểm soát',
        imageUrl: 'https://guutarot.com/wp-content/uploads/2016/09/04.jpg',
        description: 'Biểu tượng của trật tự thế giới và sự bảo vệ.'
    },
    {
        id: '5', name: 'The Hierophant', arcana: 'Major',
        meaningUpright: 'Truyền thống, niềm tin, giáo dục, sự phù hợp',
        meaningReversed: 'Nổi loạn, tự do, thay đổi niềm tin',
        imageUrl: 'https://tarot.vn/wp-content/uploads/2017/09/5-The-Hierophant-After-Tarot.jpg',
        description: 'Người thầy tâm linh và các giá trị truyền thống.'
    },
    {
        id: '6', name: 'The Lovers', arcana: 'Major',
        meaningUpright: 'Tình yêu, hòa hợp, lựa chọn giá trị',
        meaningReversed: 'Mất cân bằng, lựa chọn sai lầm, xung đột',
        imageUrl: 'https://www.astrojyotish.com/images/tarot/the-lovers.jpg',
        description: 'Sự kết hợp linh hồn và những lựa chọn của trái tim.'
    },
    {
        id: '7', name: 'The Chariot', arcana: 'Major',
        meaningUpright: 'Chiến thắng, ý chí, quyết tâm, kiểm soát',
        meaningReversed: 'Thiếu định hướng, mất kiểm soát, gây hấn',
        imageUrl: 'https://images.squarespace-cdn.com/content/v1/575c175722482ea13706dd8a/1488820858134-9V5YLD6X5HSIG4ODVU3L/chariot',
        description: 'Sự tiến lên mạnh mẽ vượt qua mọi trở ngại.'
    },
    {
        id: '8', name: 'Strength', arcana: 'Major',
        meaningUpright: 'Sức mạnh nội tâm, can đảm, kiên nhẫn',
        meaningReversed: 'Tự ti, yếu đuối, thiếu tự chủ',
        imageUrl: 'https://hoctarot.com/wp-content/uploads/2020/01/maj08.jpg',
        description: 'Sức mạnh của sự dịu dàng chế ngự bản năng hoang dã.'
    },
    {
        id: '9', name: 'The Hermit', arcana: 'Major',
        meaningUpright: 'Chiêm nghiệm, tìm kiếm nội tâm, cô độc',
        meaningReversed: 'Cô lập, thu mình quá mức, mất phương hướng',
        imageUrl: 'https://tarot.vn/wp-content/uploads/2015/05/9.-The-Hermit.jpg',
        description: 'Hành trình tìm kiếm ánh sáng tri thức bên trong.'
    },
    {
        id: '10', name: 'Wheel of Fortune', arcana: 'Major',
        meaningUpright: 'May mắn, thay đổi, chu kỳ vận mệnh',
        meaningReversed: 'Xui xẻo, sự phản kháng trước thay đổi',
        imageUrl: 'https://gates-of-light.com/wp-content/uploads/2016/01/tarot-keys-1-29-06-003-wheel-of-fortune-10.jpg',
        description: 'Bánh xe không ngừng quay, mang lại những vận may mới.'
    },
    {
        id: '11', name: 'Justice', arcana: 'Major',
        meaningUpright: 'Công lý, sự thật, nhân quả, trách nhiệm',
        meaningReversed: 'Bất công, dối trá, thiếu trách nhiệm',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/RWS_Tarot_11_Justice.jpg/960px-RWS_Tarot_11_Justice.jpg',
        description: 'Sự cân bằng và minh bạch trong mọi quyết định.'
    },
    {
        id: '12', name: 'The Hanged Man', arcana: 'Major',
        meaningUpright: 'Hy sinh, buông bỏ, góc nhìn mới, trì hoãn',
        meaningReversed: 'Bế tắc, phản kháng, thiếu tiến triển',
        imageUrl: 'https://tarot.vn/wp-content/uploads/2014/07/12-Hanged-Man-icon.png',
        description: 'Sự dừng lại để nhìn nhận cuộc sống từ một góc độ khác.'
    },
    {
        id: '13', name: 'Death', arcana: 'Major',
        meaningUpright: 'Kết thúc, chuyển hóa, buông bỏ quá khứ',
        meaningReversed: 'Trì trệ, sợ hãi thay đổi, bám víu cũ kỹ',
        imageUrl: 'https://miro.medium.com/v2/resize:fit:1400/1*TpsUqkslGtg__duRTNXMhw.jpeg',
        description: 'Sự kết thúc cần thiết để bắt đầu một chương mới.'
    },
    {
        id: '14', name: 'Temperance', arcana: 'Major',
        meaningUpright: 'Cân bằng, điều độ, kiên nhẫn, hòa hợp',
        meaningReversed: 'Mất cân bằng, cực đoan, thiếu kiên nhẫn',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAMnTHJ3U3K34yi1UmPIm1Jiw8RwWo7FX5gA&s',
        description: 'Sự kết hợp hài hòa giữa các yếu tố đối lập.'
    },
    {
        id: '15', name: 'The Devil', arcana: 'Major',
        meaningUpright: 'Ràng buộc, cám dỗ, vật chất, ám ảnh',
        meaningReversed: 'Giải phóng, tự do, vượt qua nỗi sợ',
        imageUrl: 'https://tarot.vn/wp-content/uploads/2015/12/15-Major-Devil.jpg',
        description: 'Những sợi dây vô hình đang trói buộc tiềm năng của bạn.'
    },
    {
        id: '16', name: 'The Tower', arcana: 'Major',
        meaningUpright: 'Thay đổi đột ngột, hỗn loạn, sụp đổ, thức tỉnh',
        meaningReversed: 'Sợ hãi thảm họa, tránh né sự thật, trì hoãn sụp đổ',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg',
        description: 'Sự sụp đổ của những cấu trúc cũ để xây dựng lại từ nền móng.'
    },
    {
        id: '17', name: 'The Star', arcana: 'Major',
        meaningUpright: 'Hy vọng, niềm tin, đổi mới, tâm linh',
        meaningReversed: 'Mất hy vọng, thiếu tin tưởng, mất phương hướng',
        imageUrl: 'https://moryarty.com/cdn/shop/files/tarot-star-lauron-william-laurence-nude-sky-water-poster-framed-black-aluminium.jpg?v=1761314742&width=1445',
        description: 'Ánh sáng dẫn đường mang lại sự chữa lành.'
    },
    {
        id: '18', name: 'The Moon', arcana: 'Major',
        meaningUpright: 'Ảo giác, lo âu, tiềm thức, trực giác',
        meaningReversed: 'Giải phóng nỗi sợ, hiểu lầm được làm sáng tỏ',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/RWS_Tarot_18_Moon.jpg/960px-RWS_Tarot_18_Moon.jpg',
        description: 'Thế giới của giấc mơ nơi sự thật bị che mờ.'
    },
    {
        id: '19', name: 'The Sun', arcana: 'Major',
        meaningUpright: 'Thành công, hạnh phúc, sức sống, tích cực',
        meaningReversed: 'Thiếu nhiệt huyết, bi quan, thành công bị trì hoãn',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/RWS_Tarot_19_Sun.jpg/250px-RWS_Tarot_19_Sun.jpg',
        description: 'Nguồn năng lượng rực rỡ mang lại niềm vui thuần khiết.'
    },
    {
        id: '20', name: 'Judgement', arcana: 'Major',
        meaningUpright: 'Phán xét, thức tỉnh, sự chuộc lỗi, quyết định',
        meaningReversed: 'Tự nghi ngờ, sợ hãi bị phán xét, trì hoãn quyết định',
        imageUrl: 'https://hoctarot.com/wp-content/uploads/2020/01/maj20.jpg',
        description: 'Tiếng gọi của vũ trụ để đánh giá lại hành trình của mình.'
    },
    {
        id: '21', name: 'The World', arcana: 'Major',
        meaningUpright: 'Hoàn thành, thành tựu, hội nhập, du hành',
        meaningReversed: 'Thiếu sự kết thúc, trì trệ, mục tiêu dở dang',
        imageUrl: 'https://tarot.vn/wp-content/uploads/2014/07/21-World-icon.png',
        description: 'Chu kỳ đã hoàn tất trong sự hòa hợp tuyệt đối.'
    }
];