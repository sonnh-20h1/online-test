import React, { Component } from "react";
import {
  Container,
  Breadcrumb,
  BreadcrumbItem
} from "react-bootstrap";
import {
  Row, Col, InputGroup, InputGroupAddon, Input, Button
} from "reactstrap";
import axios from "axios";
import { API } from "./../../API/API";
import "./term.css";

const SecBreadcrumb = () => {
  return (
    <div className="ol-breadcrumb">
      <Container>
        <Breadcrumb className="breadcrumb__content">
          <BreadcrumbItem active>ĐIỀU KHOẢN VÀ ĐIỀU KIỆN SỬ DỤNG CỦA TEST Y DƯỢC ONLINE </BreadcrumbItem>
        </Breadcrumb>
      </Container>
    </div>
  );
};

const InformationTerm = () => {
  return (
    <React.Fragment>
      <p>
        Xin chào bạn và mời bạn tham khảo Điều khoản và Điều kiện sử dụng của TEST Y DƯỢC ONLINE (“Điều khoản”).
        Các điều khoản dưới đây rất quan trọng bởi vì nội dung điều khoản:
      </p>
      <p>
        <ul>
          <li>Đề cập đến quyền hợp pháp của bạn trên TEST Y DƯỢC ONLINE</li>
          <li>Giải thích quyền bạn cấp cho chúng tôi khi sử dụng TEST Y DƯỢC ONLINE</li>
          <li>Mô tả các quy định mọi người cần tuân thủ khi sử dụng TEST Y DƯỢC ONLINE</li>
          <li>Bao gồm một điều khoản miễn trừ hành động tập thể và một thỏa thuận về
            cách giải quyết bất kỳ tranh chấp nào có thể phát sinh bằng hình thức trọng tài
        </li>
        </ul>
      </p>
      <p>Vui lòng đọc kỹ các Điều khoản này, Chính sách Quyền riêng tư của chúng tôi
        và bất kỳ điều khoản nào được tham chiếu trong tài liệu này.
        Chúng tôi hy vọng bạn đang ngồi thật thoải mái và đọc hết bản thỏa thuận này.</p>
      <p>Bắt đầu nào…</p>

      <h1>1. Giới thiệu</h1>

      <p>Xin cám ơn bạn đã chọn TEST Y DƯỢC ONLINE (“TEST Y DƯỢC ONLINE”, “TESTYDUOCONLINE.COM”, “chúng tôi”, “của chúng tôi”).
        TEST Y DƯỢC ONLINE cung cấp hệ thống luyện thi, thi thử trắc nghiệm trực tuyến
        và các nội dung khác cũng như các sản phẩm và dịch vụ khác có thể được phát triển theo thời gian.
        Các nội dung câu hỏi được sưu tập từ nhiều nguồn và được đóng góp bởi những người sử dụng hệ thống TESTYDUOCONLINE.COM.
        Chúng tôi cung cấp một hệ thống để sắp xếp các câu hỏi mà người dùng đóng góp thành các đề thi trắc nghiệm phục vụ chính nhu cầu của người sử dụng.
      </p>
      <p>
        Bạn sẽ cần phải trả phí sử dụng cho hệ thống nhằm duy trì sự hoạt động của hệ thống và các dịch vụ khác đi kèm hệ thống của TEST Y DƯỢC ONLINE.
      </p>
      <p>
        Bằng cách đăng ký hoặc sử dụng bất kỳ dịch vụ TEST Y DƯỢC ONLINE nào, bao gồm tất cả các tính năng và chức năng liên quan, các trang web và giao diện người dùng, cũng như tất cả các nội dung và ứng dụng phần mềm liên quan đến các dịch vụ của chúng tôi (gọi chung là “Dịch vụ TEST Y DƯỢC ONLINE” hoặc “Dịch vụ”), hoặc truy cập bất kỳ loại nội dung hay tài liệu nào được cung cấp thông qua Dịch vụ (“Nội dung”) mà bạn ký kết hợp đồng ràng buộc với TEST Y DƯỢC ONLINE.
      </p>
      <p>
        Thỏa thuận của bạn với chúng tôi bao gồm các Điều khoản này của chúng tôi và bất kỳ điều khoản bổ sung nào mà bạn đồng ý, như được trình bày trong phần Toàn bộ thỏa thuận dưới đây, ngoài các điều khoản với bất kỳ bên thứ ba nào khác (gọi chung là “Các thỏa thuận”). Các thỏa thuận bao gồm các điều khoản liên quan đến thay đổi các Thỏa thuận trong tương lai, giới hạn trách nhiệm pháp lý, quyền riêng tư. Nếu muốn xem lại các điều khoản của Thoả thuận, bạn có thể xem phiên bản Thỏa thuận đang có hiệu lực trên trang web của TEST Y DƯỢC ONLINE. Bạn thừa nhận rằng bạn đã đọc và hiểu rõ, chấp nhận và đồng ý chịu sự ràng buộc của các Thỏa thuận này. Nếu bạn không đồng ý (hoặc không thể tuân thủ) các Thỏa thuận này thì bạn không thể sử dụng Dịch vụ TEST Y DƯỢC ONLINE hoặc truy cập Nội dung.
      </p>
      <p>
        Để sử dụng Dịch vụ TEST Y DƯỢC ONLINE và truy cập bất kỳ Nội dung, bạn cần (1) có đủ quyền hạn để ký hợp đồng ràng buộc với chúng tôi và không bị cấm cản ký hợp đồng theo bất kỳ pháp luật hiện hành nào. Bạn cũng cam kết rằng mọi thông tin đăng ký mà bạn gửi đến TEST Y DƯỢC ONLINE là đúng sự thật, chính xác và đầy đủ và bạn đồng ý duy trì các thông tin đó luôn đúng sự thật, chính xác và đầy đủ.
      </p>
      <h1>2. Thay đổi các Thỏa thuận</h1>

      <p>
        Đôi khi chúng tôi có thể thay đổi các Thỏa thuận vì các lý do hợp lý, chẳng hạn như cải thiện các chức năng hoặc tính năng hiện có hoặc bổ sung thêm các chức năng hoặc tính năng mới cho Dịch vụ, áp dụng các tiến bộ khoa học và công nghệ và các điều chỉnh kỹ thuật hợp lý cho Dịch vụ, đảm bảo khả năng hoạt động hoặc tính bảo mật của Dịch vụ và vì lý do pháp lý hoặc quy định. Khi chúng tôi tiến hành các thay đổi quan trọng với các Thỏa thuận, chúng tôi sẽ thông báo cho bạn thông tin phù hợp trong các tình huống, ví dụ như bằng cách đăng thông báo nổi bật hoặc tìm kiếm sự đồng ý của bạn bên trong Dịch vụ hoặc gửi email cho bạn. Trong một số trường hợp, chúng tôi sẽ thông báo cho bạn trước và việc bạn tiếp tục sử dụng Dịch vụ sau khi thay đổi được thực hiện sẽ đồng nghĩa với việc bạn chấp nhận các thay đổi đó. Do đó, vui lòng đảm bảo rằng bạn đọc kỹ bất kỳ thông báo nào như vậy. Nếu bạn không muốn tiếp tục sử dụng Dịch vụ theo phiên bản Thỏa thuận mới, bạn có thể chấm dứt tài khoản của mình bằng cách liên hệ với chúng tôi. Nếu bạn nhận được Dịch vụ dùng thử hoặc Dịch vụ trả phí thông qua bên thứ ba, bạn phải hủy Dịch vụ trả phí trong phạm vi áp dụng thông qua bên thứ ba đó.
      </p>

      <h1>3. Thưởng thức TEST Y DƯỢC ONLINE</h1>
      <p>
        Dưới đây là một số thông tin về tất cả các cách bạn có thể thưởng thức TEST Y DƯỢC ONLINE.
      </p>
      <h2>3.1 Tùy chọn dịch vụ</h2>
      <p>
        Bạn có thể tìm thấy bản mô tả các tùy chọn Dịch vụ trong email đầu tiên của chúng tôi gửi tới bạn ngay sau khi bạn tạo tài khoản (chậm nhất sau 48h) và chúng tôi sẽ giải thích các tùy chọn Dịch vụ nào có sẵn khi bạn tạo một tài khoản TEST Y DƯỢC ONLINE. Một số tùy chọn được cung cấp miễn phí cho bạn. Dịch vụ TEST Y DƯỢC ONLINE không yêu cầu thanh toán hiện được gọi là “Dịch vụ miễn phí”. Các tùy chọn khác yêu cầu thanh toán trước khi bạn có thể truy cập (“Dịch vụ trả phí”). Chúng tôi cũng có thể cung cấp các chương trình ưu đãi khuyến mại đặc biệt, quyền thành viên hoặc các dịch vụ khác, bao gồm việc cung cấp các sản phẩm và dịch vụ của bên thứ ba kết hợp với hoặc thông qua Dịch vụ TEST Y DƯỢC ONLINE. Chúng tôi không chịu trách nhiệm về các sản phẩm và dịch vụ do các bên thứ ba này cung cấp. Chúng tôi bảo lưu quyền điều chỉnh, chấm dứt hoặc sửa đổi các chương trình đăng ký sử dụng dịch vụ và chương trình ưu đãi khuyến mại được cung cấp vào bất kỳ thời điểm nào phù hợp với các Điều khoản này.
      </p>
      <p>
        Dịch vụ không giới hạn có thể không được cung cấp cho tất cả người dùng. Chúng tôi sẽ nói rõ các dịch vụ nào khi đăng ký sử dụng dịch vụ. Nếu bạn hủy đăng ký Dịch vụ không giới hạn hoặc nếu đăng ký Dịch vụ không giới hạn của bạn bị gián đoạn (ví dụ: nếu bạn thay đổi thông tin thanh toán) thì có khả năng bạn sẽ không thể đăng ký lại Dịch vụ không giới hạn. Xin lưu ý rằng Dịch vụ không giới hạn có thể được ngừng cung cấp trong tương lai, trong trường hợp đó, bạn sẽ không còn phải trả phí Dịch vụ nữa.
      </p>
      <p>
        Nếu bạn đã mua hoặc nhận mã, thẻ quà tặng, phiếu mua hàng trả trước hoặc ưu đãi khác được cung cấp hoặc bán trực tiếp bởi TEST Y DƯỢC ONLINE hoặc thay mặt cho TEST Y DƯỢC ONLINE để truy cập Dịch vụ trả phí (“Mã”), thì các điều khoản và điều kiện riêng biệt được trình bày cho bạn kèm theo Mã cũng có thể áp dụng cho việc bạn truy cập vào Dịch vụ và bạn đồng ý tuân thủ các điều khoản và điều kiện đó. Bạn cũng có thể mua quyền truy cập Dịch vụ trả phí thông qua bên thứ ba. Trong những trường hợp này, các điều khoản và điều kiện riêng biệt với bên thứ ba đó ngoài các Thỏa thuận này có thể áp dụng cho việc bạn truy cập vào Dịch vụ.
      </p>

      <h2>3.2 Bản dùng thử</h2>
      <p>
        Tùy từng thời điểm, chúng tôi hoặc những cá nhân khác thay mặt chúng tôi có thể cung cấp bản dùng thử của Dịch vụ trả phí trong một khoảng thời gian nhất định mà không cần thanh toán hoặc có mức phí thấp hơn (“Bản dùng thử”). TEST Y DƯỢC ONLINE có thể xác định bạn có đủ điều kiện sử dụng Bản dùng thử hay không và thu hồi hoặc điều chỉnh Bản dùng thử vào bất kỳ thời điểm nào mà không cần thông báo trước và không phải chịu trách nhiệm, trong phạm vi được pháp luật cho phép.
      </p>
      <p>
        Đối với một số Bản dùng thử, chúng tôi sẽ yêu cầu bạn cung cấp thông tin chi tiết thanh toán để bắt đầu dùng thử. Bằng cách cung cấp các thông tin chi tiết này, bạn đồng ý rằng chúng tôi có thể tự động bắt đầu tính phí sử dụng Dịch vụ trả phí vào ngày đầu tiên sau khi kết thúc thời hạn sử dụng bản Dùng thử theo định kỳ hàng tháng hoặc khoảng thời gian khác mà chúng tôi tiết lộ trước cho bạn. NẾU KHÔNG MUỐN TRẢ PHÍ, BẠN PHẢI HỦY ĐĂNG KÝ DỊCH VỤ TRẢ PHÍ TRƯỚC KHI KẾT THÚC THỜI GIAN DÙNG THỬ BẰNG CÁCH NHẤP VÀO ĐỒNG Ý NẾU BẠN ĐĂNG KÝ DÙNG THỬ QUA TEST Y DƯỢC ONLINE HOẶC NẾU BẠN NHẬN ĐƯỢC BẢN DÙNG THỬ THÔNG QUA BÊN THỨ BA, BẠN PHẢI HỦY ĐĂNG KÝ DỊCH VỤ TRẢ PHÍ ĐƯỢC ÁP DỤNG THÔNG QUA BÊN THỨ BA.
      </p>
      <h1>4. Thanh toán</h1>
      <p>
        Bạn có thể mua Dịch vụ trả phí từ TEST Y DƯỢC ONLINE cách (1) trả phí sử dụng dịch vụ hàng tháng hoặc trả phí sử dụng dịch vụ trong một khoảng thời gian định kỳ khác được tiết lộ cho bạn trước khi mua Dịch vụ; hoặc (2) trả trước phí dịch vụ cho phép bạn truy cập Dịch vụ TEST Y DƯỢC ONLINE trong một khoảng thời gian cụ thể (“Thời gian trả trước”).
      </p>
      <p>
        TEST Y DƯỢC ONLINE có thể thay đổi mức phí Dịch vụ trả phí, bao gồm phí đăng ký định kỳ, Thời gian trả trước (đối với khoảng thời gian chưa thanh toán) hoặc Mã dịch vụ tùy từng thời điểm và sẽ thông báo trước cho bạn bất kỳ thay đổi nào về mức giá và cách chấp nhận những thay đổi, nếu có. Thay đổi mức giá sẽ có hiệu lực vào đầu thời gian đăng ký sử dụng dịch vụ tiếp theo sau ngày thay đổi mức phí. Theo luật áp dụng, bạn chấp nhận mức giá mới khi tiếp tục sử dụng Dịch vụ TEST Y DƯỢC ONLINE sau khi mức giá thay đổi có hiệu lực. Nếu không đồng ý với mức giá thay đổi, bạn có quyền từ chối thay đổi bằng cách hủy đăng ký Dịch vụ trả phí trước khi mức giá thay đổi có hiệu lực.
      </p>
      <h1>5. Sử dụng dịch vụ của chúng tôi</h1>
      <p>
        Dịch vụ TEST Y DƯỢC ONLINE và Nội dung là tài sản sở hữu của TEST Y DƯỢC ONLINE và các bên cấp phép của TEST Y DƯỢC ONLINE. Chúng tôi cấp cho bạn quyền sử dụng Dịch vụ TEST Y DƯỢC ONLINE hạn chế, không độc quyền và có thể thu hồi và quyền sử dụng Nội dung vì mục đích cá nhân, phi thương mại hạn chế, không độc quyền và có thể thu hồi (gọi chung là “Quyền truy cập”). Quyền truy cập này sẽ giữ nguyên hiệu lực trừ khi và cho đến khi bạn hoặc TEST Y DƯỢC ONLINE chấm dứt quyền này. Bạn cam kết và đồng ý rằng bạn đang sử dụng Dịch vụ TEST Y DƯỢC ONLINE và Nội dung vì mục đích cá nhân, phi thương mại và bạn sẽ không phân phối lại hoặc chuyển giao Dịch vụ TEST Y DƯỢC ONLINE hoặc Nội dung. Các ứng dụng phần mềm TEST Y DƯỢC ONLINE và Nội dung không được bán hoặc chuyển giao cho bạn và TEST Y DƯỢC ONLINE cùng các bên cấp phép của TEST Y DƯỢC ONLINE bảo lưu mọi quyền sở hữu tất cả các bản sao của các ứng dụng phần mềm TEST Y DƯỢC ONLINE và Nội dung cả sau khi đã cài đặt trên máy tính cá nhân, điện thoại di động, máy tính bảng, thiết bị đeo, loa và/hoặc các thiết bị khác (“Thiết bị”).
      </p>
      <p>
        Tất cả các nhãn hiệu TEST Y DƯỢC ONLINE, nhãn hiệu dịch vụ, tên thương mại, biểu trưng, tên miền và bất kỳ đặc điểm nào khác của thương hiệu TEST Y DƯỢC ONLINE (“Đặc điểm thương hiệu TEST Y DƯỢC ONLINE”) là tài sản do TEST Y DƯỢC ONLINE hoặc các bên cấp phép của TEST Y DƯỢC ONLINE toàn quyền sở hữu. Các Thỏa thuận này không cấp cho bạn bất kỳ quyền sử dụng bất kỳ Đặc điểm thương hiệu TEST Y DƯỢC ONLINE nào dù là cho mục đích thương mại hay phi thương mại.
      </p>
      <p>
        Bạn đồng ý tuân theo Hướng dẫn người dùng của chúng tôi và không sử dụng Dịch vụ TEST Y DƯỢC ONLINE, Nội dung, hoặc bất kỳ phần mục nào thuộc Dịch vụ và Nội dung dưới bất kỳ hình thức nào không được quy định rõ ràng trong các Thỏa thuận. Trừ các quyền được quy định rõ ràng trong Thỏa thuận, TEST Y DƯỢC ONLINE không cấp quyền, quyền sở hữu hoặc lợi ích nào cho bạn trong Dịch vụ TEST Y DƯỢC ONLINE hoặc Nội dung.
      </p>
      <p>
        Phần mềm của bên thứ ba (ví dụ: thư viện phần mềm nguồn mở) trong Dịch vụ TEST Y DƯỢC ONLINE được cung cấp cho bạn theo các điều khoản cấp phép phù hợp của thư viện phần mềm bên thứ ba như được trình bày trong phần trợ giúp hoặc phần cài đặt trên máy tính để bàn và ứng dụng di động và/hoặc trên trang web của chúng tôi.
      </p>
      <h1>6. Ứng dụng và Thiết bị của bên thứ ba</h1>
      <p>
        Dịch vụ TEST Y DƯỢC ONLINE được tích hợp hoặc có thể tương tác với các ứng dụng, trang web và dịch vụ của bên thứ ba (”Ứng dụng của bên thứ ba”) và các Thiết bị của bên thứ ba để cung cấp Dịch vụ TEST Y DƯỢC ONLINE cho bạn. Các Ứng dụng và Thiết bị của bên thứ ba này có thể áp dụng các điều khoản và điều kiện sử dụng và chính sách quyền riêng tư riêng và việc sử dụng các Ứng dụng và Thiết bị của bên thứ ba này sẽ tuân theo các điều khoản và điều kiện và chính sách quyền riêng tư đó. Bạn hiểu và đồng ý rằng TEST Y DƯỢC ONLINE không ủng hộ và không chịu trách nhiệm hoặc có nghĩa vụ pháp lý đối với hành vi, tính năng hoặc nội dung của bất kỳ Ứng dụng hoặc Thiết bị của bên thứ ba nào hoặc đối với bất kỳ giao dịch nào mà bạn có thể tham gia với nhà cung cấp Ứng dụng và Thiết bị của bên thứ ba. Đồng thời, TEST Y DƯỢC ONLINE cũng không đảm bảo tính tương thích hoặc tính tương thích lâu dài của các Ứng dụng và Thiết bị của bên thứ ba với Dịch vụ.
      </p>
      <h1>7. Nội dung do người dùng tạo ra</h1>
      <p>
        Người dùng TEST Y DƯỢC ONLINE có thể đăng, tải lên hoặc đóng góp nội dung cho Dịch vụ (có thể bao gồm câu hỏi trắc nghiệm các dạng, hình ảnh, văn bản, tin nhắn, thông tin, tiêu đề danh sách phát, mô tả và nội dung biên soạn và/hoặc các loại nội dung khác) (“Nội dung người dùng” ). Để tránh nhầm lẫn, “Nội dung người dùng” bao gồm bất kỳ nội dung nào được đăng lên TEST Y DƯỢC ONLINE cũng như bất kỳ phần nào khác của Dịch vụ TEST Y DƯỢC ONLINE.
      </p>
      <p>
        Bạn cam kết rằng, đối với bất kỳ Nội dung Người dùng nào bạn đăng lên TEST Y DƯỢC ONLINE, (1) bạn sở hữu hoặc có quyền đăng Nội dung người dùng đó và (2) Nội dung người dùng đó, hoặc việc TEST Y DƯỢC ONLINE sử dụng các nội dung đó theo quy định trong Thỏa thuận này sẽ không vi phạm Thỏa thuận hoặc bất kỳ quyền nào khác được nêu trong Hướng dẫn người dùng, luật áp dụng, hoặc gây hại đến tài sản sở hữu trí tuệ, hình ảnh công khai, nhân cách, hoặc vi phạm các quyền của người khác hoặc ngụ ý rằng có sự liên kết với bạn hoặc có sự ủng hộ bạn hoặc Nội dung người dùng của bạn thông qua TEST Y DƯỢC ONLINE hoặc bất kỳ nghệ sĩ, ban nhạc, nhãn, pháp nhân hoặc cá nhân nào khác khi không có sự đồng ý bằng văn bản của TEST Y DƯỢC ONLINE hoặc cá nhân hoặc tổ chức đó.
      </p>
      <p>
        TEST Y DƯỢC ONLINE có thể, nhưng không có nghĩa vụ giám sát, xem xét hoặc chỉnh sửa Nội dung người dùng. Trong mọi trường hợp, TEST Y DƯỢC ONLINE có quyền xóa hoặc vô hiệu hóa quyền truy cập vào bất kỳ Nội dung người dùng nào vì bất kỳ lý do nào hoặc không cần cung cấp lý do, bao gồm Nội dung người dùng mà TEST Y DƯỢC ONLINE có toàn quyền quyết định là đã vi phạm các Thỏa thuận. TEST Y DƯỢC ONLINE có thể thực hiện những hành động này mà không cần thông báo trước cho bạn hoặc bất kỳ bên thứ ba nào khác. Việc xóa hoặc vô hiệu hóa quyền truy cập vào Nội dung người dùng sẽ do chúng tôi toàn quyền quyết định và chúng tôi không cam kết sẽ xóa hoặc vô hiệu hóa quyền truy cập vào bất kỳ Nội dung người dùng cụ thể nào.
      </p>
      <p>
        Bằng việc UPLOAD các Nội dung người dùng lên hệ thống TEST Y DƯỢC ONLINE thông qua chức năng UPLOAD được cung cấp bởi hệ thống hoặc thông qua email hay bất kỳ phương tiện truyền thông, hệ thống truyền tín hiện nào khác, Bạn cam kết rằng TEST Y DƯỢC ONLINE có toàn quyền sử dụng, khai thác những Nội dung người dùng đó cho bất kỳ mục đích nào được pháp luật cho phép.
      </p>
      <p>
        Trong trường hợp xảy ra khiếu nại từ bất kỳ một bên thứ ba nào về các Nội dung người dùng có trên hệ thống TEST Y DƯỢC ONLINE, chúng tôi hoàn toàn không chịu trách nhiệm về việc tranh chấp bản quyền giữa bạn và bên khiếu nại về các nội dung đó. Chúng tôi cam kết sẽ bảo mật thông tin của bạn (trừ trường hợp được các cơ quan có thẩm quyền yêu cầu cung cấp thông tin nhằm phục vụ điều tra) trong trường hợp xảy ra tranh chấp với bên thứ ba về các Nội dung người dùng mà bạn đã gửi cho chúng tôi
      </p>
      <p>
        Bạn hoàn toàn chịu trách nhiệm về tất cả Nội dung người dùng mà bạn đăng. TEST Y DƯỢC ONLINE không chịu trách nhiệm về Nội dung người dùng và cũng không xác nhận bất kỳ ý kiến nào trong Nội dung người dùng. BẠN ĐỒNG Ý RẰNG NẾU CÓ BẤT CỨ CÁ NHÂN NÀO KHIẾU NẠI TEST Y DƯỢC ONLINE LIÊN QUAN ĐẾN NỘI DUNG NGƯỜI DÙNG MÀ BẠN ĐĂNG THÌ TRONG PHẠM VI ĐƯỢC LUẬT PHÁP ĐỊA PHƯƠNG CHO PHÉP, BẠN SẼ PHẢI BỒI THƯỜNG VÀ BẢO VỆ TEST Y DƯỢC ONLINE TRƯỚC MỌI THIỆT HẠI, TỔN THẤT VÀ CHI PHÍ DƯỚI BẤT KỲ HÌNH THỨC NÀO (BAO GỒM CÁC LOẠI PHÍ VÀ CHI PHÍ THUÊ LUẬT SƯ HỢP LÝ) PHÁT SINH TỪ KHIẾU NẠI ĐÓ.
      </p>
      <h1>8. Quyền bạn cấp cho chúng tôi</h1>
      <p>
        Khi xét đến các quyền được cấp cho bạn theo các Thoả thuận này, bạn cấp cho chúng tôi quyền (1) cho phép Dịch vụ TEST Y DƯỢC ONLINE sử dụng bộ vi xử lý, băng thông và phần cứng lưu trữ trên Thiết bị của bạn để tạo điều kiện cho Dịch vụ hoạt động, (2) cung cấp quảng cáo và các thông tin khác cho bạn và (3) cho phép các đối tác kinh doanh của chúng tôi thực hiện các hoạt động tương tự. Trong bất kỳ phần nào của Dịch vụ TEST Y DƯỢC ONLINE, Nội dung mà bạn truy cập, bao gồm lựa chọn và vị trí nội dung, có thể bị ảnh hưởng bởi các nguyên tắc thương mại, bao gồm các thỏa thuận của TEST Y DƯỢC ONLINE với bên thứ ba. Một số Nội dung được cấp phép, cung cấp, tạo bởi hoặc chuẩn bị bởi TEST Y DƯỢC ONLINE (ví dụ như tệp tin âm thanh podcast) có thể bao gồm quảng cáo như một phần của Nội dung. Dịch vụ TEST Y DƯỢC ONLINE cung cấp Nội dung như vậy ở trạng thái không chỉnh sửa cho bạn.
      </p>
      <p>
        Nếu bạn gửi phản hồi, ý kiến hoặc đề xuất cho TEST Y DƯỢC ONLINE liên quan đến Dịch vụ TEST Y DƯỢC ONLINE hoặc Nội dung (”Phản hồi”), bạn xác nhận rằng Phản hồi này không phải là bí mật và bạn cho phép TEST Y DƯỢC ONLINE sử dụng không giới hạn Phản hồi đó và không cần thanh toán cho bạn. Phản hồi được coi là một loại Nội dung người dùng.
      </p>
      <p>
        Bạn cấp cho TEST Y DƯỢC ONLINE giấy phép không độc quyền, có thể chuyển giao, có thể cấp giấy phép thứ cập, miễn phí bản quyền, có hiệu lực vĩnh viễn (hoặc trong một thời gian bằng thời hạn Thỏa thuận cộng thêm hai mươi (20) năm khi ở các khu vực mà điều này không được pháp luật cho phép), không huỷ ngang, thanh toán đầy đủ, có giá trị trên phạm vi toàn thế giới để sử dụng, sao chép, công bố ra công chúng (cụ thể là biểu diễn hoặc hiển thị), phát hành, dịch, sửa đổi, sáng tạo các sản phẩm phái sinh và phân phối bất kỳ Nội dung người dùng nào của bạn liên quan đến Dịch vụ thông qua bất kỳ phương tiện nào,dù theo hình thức riêng biệt hay kết hợp với các Nội dung hoặc Tài liệu khác bằng bất kỳ phương tiện, phương thức hoặc công nghệ nào, dù đã được biết đến trong hiện tại hay được tạo ra sau trong tương lai. Ngoài các quyền được quy định cụ thể ở đây, bạn bảo lưu quyền sở hữu tất cả các quyền, kể cả quyền sở hữu tài sản trí tuệ, đối với Nội dung người dùng. Nếu luật hiện hành cho phép và có thể áp dụng, bạn cũng đồng ý miễn trừ và không thực thi bất kỳ “quyền nhân thân” hoặc các quyền tương đương, chẳng hạn như quyền được công nhận là tác giả của bất kỳ Nội dung người dùng nào, bao gồm Phản hồi và quyền phản đối cách xử lý Nội dung người dùng mang tính xúc phạm.
      </p>
      <h1>9. Hướng dẫn người dùng</h1>
      <p>
        TEST Y DƯỢC ONLINE tôn trọng quyền sở hữu trí tuệ và hy vọng bạn cũng như vậy. Chúng tôi đã thiết lập một vài quy tắc cơ bản yêu cầu bạn tuân thủ khi sử dụng Dịch vụ, để đảm bảo TEST Y DƯỢC ONLINE luôn là dịch vụ hấp dẫn cho tất cả mọi người. Bạn phải tuân thủ các quy tắc này và khuyến khích những người dùng khác cùng tuân thủ. Các hoạt động sau đây bị nghiêm cấm vì bất kỳ lý do gì:
      </p>
      <p>
        <ul>
          <li>
            sao chép, phân phối lại, tái sản xuất, “trích xuất”, ghi chép, truyền tải, trình diễn hay phát hành ra công chúng, phát sóng, hoặc cung cấp cho công chúng bất kỳ phần nào của Dịch vụ TEST Y DƯỢC ONLINE hoặc Nội dung, hoặc sử dụng Dịch vụ TEST Y DƯỢC ONLINE hoặc Nội dung khi không được cho phép rõ ràng theo các Thoả thuận hoặc pháp luật hiện hành hoặc có thể vi phạm quyền sở hữu trí tuệ (chẳng hạn như bản quyền) trong Dịch vụ TEST Y DƯỢC ONLINE hoặc Nội dung hoặc bất kỳ phần nào của Dịch vụ/Nội dung;
          </li>
          <li>
            sử dụng Dịch vụ TEST Y DƯỢC ONLINE để nhập hoặc sao chép bất kỳ tệp tin nội bộ nào mà bạn không có quyền hợp pháp để nhập hoặc sao chép theo cách này;
          </li>
          <li>
            truyền các bản sao của Nội dung được lưu trữ trong bộ nhớ cache từ một thiết bị được ủy quyền tới bất kỳ thiết bị nào khác bằng bất kỳ hình thức nào;
          </li>
          <li>
            kỹ thuật đảo ngược, dịch ngược, tách rời, chỉnh sửa hoặc tạo ra các sản phẩm phái sinh của Dịch vụ TEST Y DƯỢC ONLINE, Nội dung hoặc bất kỳ phần nào khác, trừ khi được cho phép theo quy định của luật pháp hiện hành. [Nếu luật áp dụng cho phép bạn dịch ngược bất kỳ phần nào của Dịch vụ TEST Y DƯỢC ONLINE hoặc Nội dung khi được yêu cầu để có được thông tin cần thiết nhằm xây dựng ra một chương trình độc lập có thể được khai thác cùng với Dịch vụ TEST Y DƯỢC ONLINE hoặc với một chương trình khác, thông tin bạn nhận được từ các hoạt động (a) chỉ có thể được sử dụng cho mục tiêu đã đề cập ở trên, (b) không được phép tiết lộ hoặc truyền đạt mà không có sự đồng ý trước bằng văn bản của TEST Y DƯỢC ONLINE cho bất kỳ bên thứ ba nào không cần tiết lộ hoặc truyền đạt để đạt được mục tiêu đó và c) không được sử dụng để tạo ra bất kỳ phần mềm hoặc dịch vụ nào tương tự như bất kỳ phần nào của Dịch vụ TEST Y DƯỢC ONLINE hoặc Nội dung];
          </li>
          <li>
            phá hủy bất kỳ công nghệ nào được sử dụng bởi TEST Y DƯỢC ONLINE, các bên cấp phép hoặc bất kỳ bên thứ ba nào để bảo vệ Nội dung hoặc Dịch vụ;
          </li>
          <li>
            bán, cho thuê, cấp phép lại hay cho thuê bất kỳ phần nào của Dịch vụ TEST Y DƯỢC ONLINE hoặc Nội dung;
          </li>
          <li>
            phá vỡ bất kỳ hạn chế lãnh thổ được áp dụng bởi TEST Y DƯỢC ONLINE hoặc các bên cấp phép;
          </li>
          <li>
            tăng số lượt phát, số lượt theo dõi một cách giả mạo hoặc thao túng Dịch vụ bằng (i) sử dụng các đoạn mã bot, script hoặc các quá trình tự động khác; (ii) cung cấp hoặc chấp nhận bất kỳ hình thức bồi thường nào (tài chính hoặc bằng cách khác), hoặc (iii) bất kỳ phương thức nào khác;
          </li>
          <li>
            xóa hoặc thay đổi bản quyền, nhãn hiệu hoặc các thông báo sở hữu trí tuệ khác có trên Nội dung hoặc Dịch vụ hoặc cung cấp thông qua Dịch vụ (bao gồm nhằm mục đích che giấu hoặc thay đổi bất kỳ dấu hiệu nào về quyền sở hữu hoặc nguồn Nội dung);
          </li>
          <li>
            tìm cách hủy bỏ hoặc chặn các quảng cáo trong Dịch vụ TEST Y DƯỢC ONLINE, hoặc tạo ra/phân phối các công cụ được thiết kế để chặn các quảng cáo trong Dịch vụ TEST Y DƯỢC ONLINE;
          </li>
          <li>
            cung cấp mật khẩu của bạn cho bất kỳ người nào khác hoặc sử dụng tên người dùng và mật khẩu của bất kỳ người nào khác;
          </li>
          <li>
            “thu thập dữ liệu” Dịch vụ TEST Y DƯỢC ONLINE hoặc sử dụng bất kỳ phương thức tự động nào khác (bao gồm đoạn mã bot, scraper và spider) để xem, truy cập hoặc thu thập thông tin từ TEST Y DƯỢC ONLINE hoặc Dịch vụ TEST Y DƯỢC ONLINE;
          </li>
          <li>
            bán tài khoản người dùng hoặc danh sách phát hoặc nhận hay đề nghị nhận bất kỳ khoản bồi thường nào bằng hình thức tài chính hoặc hình thức khác để gây ảnh hưởng đến tên tài khoản hoặc danh sách phát hoặc nội dung trong tài khoản hoặc danh sách phát;
          </li>
          <li>
            nâng cấp Nội dung một cách giả mạo bằng phương thức tự động.
          </li>
          <li>
            Hãy tôn trọng TEST Y DƯỢC ONLINE, chủ sở hữu của Nội dung và những người dùng khác của Dịch vụ TEST Y DƯỢC ONLINE. Không tham gia vào bất kỳ hoạt động, đăng bất kỳ Nội dung người dùng nào, hoặc đăng ký và/hoặc sử dụng tên người dùng bao gồm các tài liệu
          </li>
          <li>
            mang tính xúc phạm, lạm dụng, phỉ báng, khiêu dâm, đe dọa, hoặc khiêu dâm;
          </li>
          <li>
            bất hợp pháp, hoặc nhằm mục đích quảng bá hoặc thực hiện hành vi bất hợp pháp dưới bất kỳ hình thức nào, bao gồm vi phạm quyền sở hữu trí tuệ, quyền riêng tư, hoặc các quyền sở hữu của TEST Y DƯỢC ONLINE hoặc bên thứ ba;
          </li>
          <li>
            cung cấp mật khẩu của bạn hoặc cố tình cung cấp mật khẩu của bất kỳ người dùng khác hoặc cố tình bao gồm dữ liệu cá nhân của bên thứ ba hoặc nhằm mục đích thu thập dữ liệu cá nhân đó;
          </li>
          <li>
            bao gồm các nội dung độc hại như phần mềm độc hại, Trojan hoặc virut, hoặc gây trở ngại cho việc truy cập của bất kỳ người dùng nào vào Dịch vụ;
          </li>
          <li>
            có ý định hoặc có hành động quấy rối hoặc bắt nạt những người dùng khác;
          </li>
          <li>
            giả mạo hoặc báo cáo sai về mối quan hệ của bạn với người dùng, cá nhân hoặc tổ chức khác, hoặc giả mạo, dối trá, lừa đảo hoặc cố tình gây hiểu nhầm;
          </li>
          <li>
            truyền tải các thư gửi hàng loạt không mong muốn hoặc các hình thức gửi thư rác khác (”thư rác”), thư rác, thư dây chuyền hoặc các loại thư tương tự;
          </li>
          <li>
            tham gia các hoạt động thương mại hoặc bán hàng, chẳng hạn như quảng cáo, khuyến mại, cuộc thi, rút thăm trúng thưởng hoặc các chương trình đa cấp khi không được TEST Y DƯỢC ONLINE cấp phép rõ ràng;
          </li>
          <li>
            liên kết, tham chiếu hoặc quảng bá các sản phẩm hoặc dịch vụ thương mại bằng hình thức khác, trừ khi được ủy quyền rõ ràng bởi TEST Y DƯỢC ONLINE;
          </li>
          <li>
            gây cản trở hoặc bằng mọi cách gây gián đoạn Dịch vụ TEST Y DƯỢC ONLINE, giả mạo, xâm phạm, hoặc cố gắng thăm dò, quét hoặc kiểm tra các lỗ hổng trong Dịch vụ hoặc hệ thống máy tính của TEST Y DƯỢC ONLINE, mạng, các quy tắc sử dụng hoặc các thành phần an ninh của TEST Y DƯỢC ONLINE, các biện pháp xác thực hoặc bất kỳ biện pháp bảo vệ khác áp dụng cho Dịch vụ, Nội dung hoặc các thành phần khác;
          </li>
          <li>
            Hoặc xung đột với các Thỏa thuận, theo xác định của TEST Y DƯỢC ONLINE
          </li>
        </ul>
      </p>
      <p>
        Bạn thừa nhận và đồng ý rằng việc đăng bất kỳ Nội dung người dùng nào vi phạm các Hướng dẫn người dùng này (hoặc TEST Y DƯỢC ONLINE có lý do tin rằng nội dung đó vi phạm các Hướng dẫn người dùng này) có thể dẫn đến việc chấm dứt ngay lập tức hoặc tạm đình chỉ tài khoản TEST Y DƯỢC ONLINE của bạn. Bạn cũng đồng ý rằng TEST Y DƯỢC ONLINE có thể lấy lại tên người dùng của bạn khi có lý do hợp lý, bao gồm lý do là bạn vi phạm các Thỏa thuận. Bạn cũng cam kết rằng bạn  sẽ là người chịu trách nhiệm trước pháp luật về tất cả những tranh chấp, khiếu nại, vi phạm khi bạn không tuân thủ hoặc vi phạm các thỏa thuận đã nêu.
      </p>
      <p>
        Hãy thận trọng trong cách bạn sử dụng Dịch vụ TEST Y DƯỢC ONLINE và nội dung bạn chia sẻ. Dịch vụ TEST Y DƯỢC ONLINE bao gồm các tính năng xã hội và tương tác, bao gồm khả năng đăng Nội dung người dùng, chia sẻ nội dung và công khai một số thông tin nhất định về bạn. Hãy nhớ rằng thông tin được chia sẻ hoặc thông tin sẵn có công khai có thể được sử dụng và chia sẻ lại bởi những người dùng khác trên TEST Y DƯỢC ONLINE hoặc qua trang web, vì vậy vui lòng sử dụng TEST Y DƯỢC ONLINE một cách thận trọng và lưu ý đến cài đặt tài khoản của bạn. TEST Y DƯỢC ONLINE không chịu trách nhiệm về các lựa chọn đăng tải tài liệu trên Dịch vụ của bạn.
      </p>
      <p>
        Mật khẩu của bạn bảo vệ tài khoản người dùng của bạn và bạn tự chịu trách nhiệm về việc giữ an toàn và bảo mật cho mật khẩu của mình. Bạn hiểu rằng bạn chịu trách nhiệm về tất cả việc sử dụng (bao gồm cả việc sử dụng trái phép) tên người dùng và mật khẩu của bạn trên Dịch vụ. Nếu tên người dùng hoặc mật khẩu của bạn bị mất hoặc bị đánh cắp, hoặc nếu bạn cho rằng bên thứ ba đã truy cập trái phép vào tài khoản của mình thì bạn phải thông báo ngay cho chúng tôi và thay đổi mật khẩu trong thời gian sớm nhất.
      </p>
      <h1>10. Giới hạn dịch vụ và điều chỉnh</h1>
      <p>
        TEST Y DƯỢC ONLINE sẽ nỗ lực hợp lý để duy trì hoạt động của Dịch vụ TEST Y DƯỢC ONLINE. Tuy nhiên, một số khó khăn về kỹ thuật nhất định, hoạt động bảo trì hoặc kiểm tra, hoặc cập nhật cần thiết để phản ánh những thay đổi trong luật pháp tương ứng và các quy định chế tài có thể dẫn tới gián đoạn dịch vụ tạm thời. TEST Y DƯỢC ONLINE có quyền điều chỉnh hoặc dừng tạm thời hoặc vĩnh viễn các chức năng và tính năng của Dịch vụ TEST Y DƯỢC ONLINE định kỳ và vào bất kỳ thời điểm nào, có thông báo trước khi có thể và không phải chịu trách nhiệm pháp lý với bạn, trừ trường hợp bị pháp luật nghiêm cấm vì các lý do hợp lệ, chẳng hạn như trong trường hợp gián đoạn, điều chỉnh hoặc chấm dứt Dịch vụ TEST Y DƯỢC ONLINE hoặc bất kỳ chức năng hay tính năng nào của Dịch vụ hoặc cần phải sửa chữa, duy trì hoặc cải thiện các chức năng hoặc tính năng hiện có hoặc bổ sung các chức năng hoặc tính năng mới cho Dịch vụ hoặc để áp dụng các tiến bộ trong khoa học và công nghệ hoặc đảm bảo tính hoạt động hoặc bảo mật của Dịch vụ, các lý do luật pháp và quy định.
      </p>
      <p>
        Mặc dù đã đề cập ở trên, nếu bạn đã thanh toán các khoản phí trả trước cho TEST Y DƯỢC ONLINE cho Dịch vụ trả phí mà TEST Y DƯỢC ONLINE vĩnh viễn ngừng hoạt động trước khi Thời hạn sử dụng dịch vụ trả trước (được xác định trong phần Thanh toán, hủy và thời gian xét duyệt), TEST Y DƯỢC ONLINE sẽ hoàn lại cho bạn các khoản phí trả trước cho thời gian trả trước sau khi ngừng hoạt động. Bạn hiểu, đồng ý và chấp nhận rằng TEST Y DƯỢC ONLINE sẽ có những nỗ lực hợp lý, nhưng không có nghĩa vụ duy trì, hỗ trợ, nâng cấp, hoặc cập nhật Dịch vụ, hoặc cung cấp tất cả hoặc bất kỳ nội dung cụ thể thông qua Dịch vụ. TEST Y DƯỢC ONLINE và/hoặc chủ sở hữu Nội dung có thể xóa bất kỳ Nội dung nào thuộc sở hữu mà không cần thông báo theo thời gian. Phần này sẽ được thi hành theo phạm vi pháp luật hiện hành cho phép.
      </p>
      <h1>11. Hỗ trợ khách hàng</h1>
      <p>
        Để hỗ trợ khách hàng với các câu hỏi liên quan đến tài khoản và thanh toán (”Các câu hỏi về hỗ trợ khách hàng”), vui lòng gửi câu hỏi đến phòng Dịch vụ khách hàng của chúng tôi qua Địa chỉ email hoặc zalo mà chúng tôi công khai trên trang web. Chúng tôi sẽ nỗ lực hợp lý để trả lời tất cả các câu hỏi Hỗ trợ khách hàng trong khoảng thời gian hợp lý nhưng không cam kết rằng bất kỳ câu hỏi Hỗ trợ khách hàng nào sẽ được phản hồi trong một khoảng thời gian cụ thể và/hoặc chúng tôi sẽ có thể trả lời bất kỳ câu hỏi nào.
      </p>
      <h1>12. Thời hạn và chấm dứt</h1>
      <p>
        Các Thỏa thuận sẽ tiếp tục áp dụng cho bạn cho đến khi bạn hoặc TEST Y DƯỢC ONLINE chấm dứt hợp đồng. Tuy nhiên, bạn thừa nhận và đồng ý rằng bạn cấp phép vĩnh viễn, không thể hủy ngang liên quan đến Nội dung người dùng, bao gồm Phản hồi cho TEST Y DƯỢC ONLINE và do đó các quyền liên quan sẽ giữ nguyên hiệu lực sau khi Thỏa thuận hết hạn hoặc bị chấm dứt vì bất kỳ lý do gì. TEST Y DƯỢC ONLINE có thể chấm dứt Thoả thuận hoặc tạm ngưng quyền truy cập của bạn vào Dịch vụ TEST Y DƯỢC ONLINE vào bất kỳ thời điểm nào, bao gồm trong trường hợp thực tế hoặc nghi ngờ sử dụng trái phép Dịch vụ TEST Y DƯỢC ONLINE và/hoặc Nội dung, không tuân thủ Thoả thuận hoặc nếu chúng tôi thu hồi Dịch vụ và/hoặc Nội dung (trong trường hợp này, chúng tôi sẽ thông báo trước cho bạn). Nếu bạn hoặc TEST Y DƯỢC ONLINE chấm dứt Thoả thuận, hoặc nếu TEST Y DƯỢC ONLINE tạm ngưng quyền truy cập của bạn vào Dịch vụ TEST Y DƯỢC ONLINE, bạn đồng ý rằng TEST Y DƯỢC ONLINE sẽ không có nghĩa vụ hay trách nhiệm gì với bạn và TEST Y DƯỢC ONLINE sẽ không hoàn trả bất kỳ số tiền nào bạn đã thanh toán, trong phạm vi tối đa mà pháp luật hiện hành cho phép. Bạn có thể chấm dứt Thỏa thuận vào bất kỳ thời điểm nào. Phần này sẽ được thi hành theo phạm vi pháp luật hiện hành cho phép.
      </p>
      <p>
        Phần 7, 8, 9, 12, 13, 14, 15, 16, 17, 18, và 19 ở đây, cũng như bất kỳ phần nào khác của Thoả thuận, rõ ràng hoặc theo tính chất của điều khoản sẽ giữ nguyên hiệu lực ngay cả sau khi chấm dứt Thỏa thuận.
      </p>
      <h1>13. Từ chối trách nhiệm bảo hành</h1>
      <p>
        BẠN HIỂU VÀ ĐỒNG Ý RẰNG DỊCH VỤ TEST Y DƯỢC ONLINE ĐƯỢC CUNG CẤP “NGUYÊN TRẠNG” VÀ “NHƯ SẴN CÓ” VÀ KHÔNG ĐƯỢC BẢO HÀNH RÕ RÀNG HOẶC NGỤ Ý DƯỚI BẤT KỲ HÌNH THỨC NÀO. TEST Y DƯỢC ONLINE VÀ TẤT CẢ CHỦ SỞ HỮU NỘI DUNG KHÔNG CAM KẾT VÀ TỪ CHỐI MỌI TRÁCH NHIỆM BẢO HÀNH HOẶC ĐIỀU KIỆN CAM KẾT VỀ CHẤT LƯỢNG, KHẢ NĂNG THƯƠNG MẠI, TÍNH TƯƠNG THÍCH CHO MỘT MỤC ĐÍCH SỬ DỤNG CỤ THỂ HOẶC KHÔNG VI PHẠM. TEST Y DƯỢC ONLINE VÀ CHỦ SỞ HỮU NỘI DUNG KHÔNG CAM KẾT RẰNG DỊCH VỤ TEST Y DƯỢC ONLINE KHÔNG CÓ CÁC PHẦN MỀM ĐỘC HẠI HOẶC CÁC THÀNH PHẦN CÓ HẠI KHÁC. NGOÀI RA, TEST Y DƯỢC ONLINE KHÔNG CAM KẾT HAY ĐẢM BẢO, XÁC NHẬN, BẢO ĐẢM HOẶC CHỊU TRÁCH NHIỆM VỀ BẤT KỲ ỨNG DỤNG (HOẶC NỘI DUNG) CỦA BÊN THỨ BA, NỘI DUNG NGƯỜI DÙNG, THIẾT BỊ HOẶC BẤT KỲ SẢN PHẨM HOẶC DỊCH VỤ NÀO ĐƯỢC QUẢNG CÁO, QUẢNG BÁ HOẶC CUNG CẤP BỞI BÊN THỨ BA TRÊN HOẶC THÔNG QUA DỊCH VỤ TEST Y DƯỢC ONLINE HOẶC BẤT KỲ TRANG WEB SIÊU LIÊN KẾT, HOẶC CÁC BIỂU NGỮ HOẶC CÁC QUẢNG CÁO KHÁC ĐƯỢC TREO TRÊN TRANG VÀ TEST Y DƯỢC ONLINE KHÔNG CHỊU TRÁCH NHIỆM HOẶC CÓ NGHĨA VỤ ĐỐI VỚI BẤT KỲ GIAO DỊCH NÀO GIỮA BẠN VÀ BÊN THỨ BA CUNG CẤP CÁC NỘI DUNG NÊU TRÊN.
      </p>
      <p>
        KHÔNG CÓ LỜI KHUYÊN HAY THÔNG TIN NÀO BẰNG LỜI NÓI HAY BẰNG VĂN BẢN MÀ BẠN THU THẬP ĐƯỢC TỪ TEST Y DƯỢC ONLINE SẼ CẤU THÀNH BẢO ĐẢM BẤT KỲ THAY MẶT TEST Y DƯỢC ONLINE. TRONG KHI SỬ DỤNG DỊCH VỤ TEST Y DƯỢC ONLINE, BẠN CÓ THỂ TRUY CẬP VÀO CÁC TÍNH NĂNG LỌC NỘI DUNG RÕ RÀNG, NHƯNG VIỆC SỬ DỤNG CÁC TÍNH NĂNG NÀY VẪN CÓ THỂ DẪN ĐẾN CHỈ HIỂN THỊ MỘT SỐ NỘI DUNG RÕ RÀNG VÀ BẠN KHÔNG NÊN DỰA VÀO CÁC TÍNH NĂNG NÀY ĐỂ LỌC TẤT CẢ NỘI DUNG RÕ RÀNG.
      </p>
      <p>
        KHÔNG HẠN CHẾ CÁC QUY ĐỊNH NÊU TRÊN, KHÔNG CÓ THÔNG TIN NÀO TRONG PHẦN NÀY CÓ HIỆU LỰC HẠN CHẾ TRÁCH NHIỆM CỦA TEST Y DƯỢC ONLINE TRONG TRƯỜNG HỢP KHÔNG THỰC HIỆN HOẶC THỰC HIỆN KHÔNG ĐẦY ĐỦ TOÀN BỘ HOẶC MỘT PHẦN CÁC NGHĨA VỤ THIẾT YẾU CỦA TEST Y DƯỢC ONLINE VỀ VIỆC CUNG CẤP DỊCH VỤ THEO THỎA THUẬN. PHẦN NÀY ÁP DỤNG PHẠM VI CAO NHẤT ĐƯỢC PHÁP LUẬT HIỆN HÀNH CHO PHÉP.
      </p>
      <p>
        PHẦN NÀY KHÔNG ẢNH HƯỞNG ĐẾN QUYỀN LỢI THEO QUY ĐỊNH CỦA BẠN VỚI TƯ CÁCH LÀ NGƯỜI TIÊU DÙNG.
      </p>
      <h1>14. Hạn chế</h1>
      <p>
        BẠN ĐỒNG Ý RẰNG BIỆN PHÁP KHẮC PHỤC DUY NHẤT CỦA BẠN VỀ CÁC VẤN ĐỀ HOẶC KHI KHÔNG HÀI LÒNG VỚI DỊCH VỤ CỦA TEST Y DƯỢC ONLINE LÀ GỠ CÀI ĐẶT PHẦN MỀM VÀ NGỪNG SỬ DỤNG DỊCH VỤ TEST Y DƯỢC ONLINE. BẠN ĐỒNG Ý RẰNG TEST Y DƯỢC ONLINE KHÔNG CÓ NGHĨA VỤ HOẶC TRÁCH NHIỆM PHÁT SINH TỪ HOẶC LIÊN QUAN ĐẾN CÁC ỨNG DỤNG HOẶC NỘI DUNG CỦA BÊN THỨ BA ĐƯỢC CUNG CẤP THÔNG QUA HOẶC LIÊN QUAN ĐẾN DỊCH VỤ TEST Y DƯỢC ONLINE VÀ KHI MỐI QUAN HỆ CỦA BẠN VỚI CÁC ỨNG DỤNG CỦA BÊN THỨ BA ĐÓ CÓ THỂ ĐƯỢC CHI PHỐI THEO CÁC QUY ĐỊNH TRONG THỎA THUẬN RIÊNG GIỮA BẠN VÀ BÊN THỨ BA ĐÓ, BIỆN PHÁP KHẮC PHỤC DUY NHẤT CỦA BẠN, GIỐNG NHƯ VỚI TEST Y DƯỢC ONLINE, CHO CÁC VẤN ĐỀ HOẶC KHI KHÔNG HÀI LÒNG VỚI CÁC ỨNG DỤNG HOẶC NỘI DUNG CỦA BÊN THỨ BA LÀ GỠ CÀI ĐẶT VÀ/HOẶC NGỪNG SỬ DỤNG ỨNG DỤNG CỦA BÊN THỨ BA ĐÓ.
      </p>
      <p>
        TRONG MỌI TRƯỜNG HỢP, TEST Y DƯỢC ONLINE, CÁN BỘ, CỔ ĐÔNG, NHÂN VIÊN, ĐẠI LÝ, GIÁM ĐỐC, CÔNG TY CON, CÔNG TY LIÊN KẾT, NGƯỜI KẾ NHIỆM, NHÀ PHÂN PHỐI, NHÀ CUNG CẤP HOẶC NGƯỜI CẤP PHÉP KHÔNG PHẢI CHỊU TRÁCH NHIỆM VỀ:
      </p>
      <p>
        (1) BẤT KỲ TỔN THẤT HOẶC THIỆT HẠI NÀO (BAO GỒM BẤT KỲ THIỆT HẠI GIÁN TIẾP, ĐẶC BIỆT, NGẪU NHIÊN, THIỆT HẠI MANG TÍNH TRỪNG PHẠT HOẶC RĂN ĐE) KHÔNG THỂ LƯỜNG TRƯỚC ĐƯỢC. TỔN THẤT HOẶC THIỆT HẠI CÓ THỂ LƯỜNG TRƯỚC ĐƯỢC NẾU RÕ RÀNG LÀ CÁC TỔN THẤT/THIỆT HẠI NÀY SẼ XẢY RA NẾU CẢ HAI BÊN ĐÃ BIẾT KHẢ NĂNG NÀY CÓ THỂ XẢY RA VÀO THỜI ĐIỂM KÝ KẾT HỢP ĐỒNG;
      </p>
      <p>
        (2) BẤT KỲ:
        (A) TỔN THẤT SỬ DỤNG;
        (B) TỔN THẤT DỮ LIỆU;
        (C) TỔN THẤT KINH DOANH;
        (D) TỔN THẤT LỢI NHUẬN; HOẶC
        (E) HƯ HỎNG THIẾT BỊ,
      </p>
      <p>
        TRONG PHẠM VI BẠN CÓ THỂ TRÁNH ĐƯỢC NHỮNG THIỆT HẠI ĐÓ BẰNG CÁCH LÀM THEO LỜI KHUYÊN CỦA CHÚNG TÔI ĐỂ ÁP DỤNG CÁC BẢN CẬP NHẬT CHO CÁC DỊCH VỤ HOẶC NỘI DUNG HOẶC NẾU HƯ HỎNG ĐÓ LÀ DO BẠN KHÔNG THỰC HIỆN ĐÚNG HƯỚNG DẪN CÀI ĐẶT HOẶC CÓ YÊU CẦU HỆ THỐNG TỐI THIỂU MÀ CHÚNG TÔI KHUYẾN NGHỊ,
      </p>
      <p>
        TRONG MỌI TRƯỜNG HỢP PHÁT SINH TỪ VIỆC SỬ DỤNG HOẶC KHÔNG CÓ KHẢ NĂNG SỬ DỤNG DỊCH VỤ, THIẾT BỊ, ỨNG DỤNG CỦA BÊN THỨ BA HOẶC NỘI DUNG ỨNG DỤNG CỦA BÊN THỨ BA, BẤT KỂ LUẬT PHÁP ÁP DỤNG, BẤT KỂ TEST Y DƯỢC ONLINE CÓ BỊ CẢNH BÁO VỀ KHẢ NĂNG XẢY RA HƯ HỎNG ĐÓ HAY KHÔNG VÀ NGAY CẢ KHI BIỆN PHÁP KHẮC PHỤC KHÔNG ĐẠT ĐƯỢC MỤC ĐÍCH CẦN THIẾT;
      </p>
      <p>
        (3) TRÁCH NHIỆM PHÁP LÝ CHUNG CHO TẤT CẢ CÁC KHIẾU NẠI LIÊN QUAN ĐẾN DỊCH VỤ TEST Y DƯỢC ONLINE, CÁC ỨNG DỤNG CỦA BÊN THỨ BA HOẶC NỘI DUNG ỨNG DỤNG CỦA BÊN THỨ BA LỚN HƠN SỐ TIỀN BẠN PHẢI TRẢ CHO TEST Y DƯỢC ONLINE TRONG 12 THÁNG TRƯỚC ĐÓ;
      </p>
      <p>
        (4) HOẶC KHÔNG THỰC HIỆN HOẶC THỰC HIỆN KHÔNG ĐẦY ĐỦ HOẶC TRÌ HOÃN THỰC HIỆN CÁC NGHĨA VỤ BẮT NGUỒN TỪ CÁC THỎA THUẬN DO TÌNH HUỐNG BẤT KHẢ KHÁNG HOẶC BẤT KỲ NGUYÊN NHÂN NÀO KHÔNG THỂ LƯỜNG TRƯỚC ĐƯỢC HOẶC VƯỢT RA NGOÀI TẦM KIỂM SOÁT HỢP LÝ CỦA TEST Y DƯỢC ONLINE.
      </p>
      <p>
        Không có điều khoản nào trong Thoả thuận này loại bỏ hoặc hạn chế trách nhiệm pháp lý của TEST Y DƯỢC ONLINE đối với hành vi gian lận, lừa dối sai sự thật, tử vong hoặc thương tích cá nhân do sơ suất và sự cẩu thả của TEST Y DƯỢC ONLINE gây ra theo quy định của luật pháp hiện hành.
      </p>
      <p>
        PHẦN NÀY ÁP DỤNG PHẠM VI CAO NHẤT ĐƯỢC PHÁP LUẬT HIỆN HÀNH CHO PHÉP. BẠN CÓ THỂ CÓ CÁC QUYỀN THEO LUẬT ÁP DỤNG TRONG KHU VỰC PHÁP LÝ CỦA MÌNH, QUY ĐỊNH CÁC BIỆN PHÁP KHẮC PHỤC NGOÀI NHỮNG ĐIỀU ĐÃ NÊU Ở TRÊN.
      </p>
      <h1>15. Quyền của bên thứ ba</h1>
      <p>
        Bạn thừa nhận và đồng ý rằng chủ sở hữu Nội dung và các nhà phân phối cụ thể (chẳng hạn như nhà cung cấp cửa hàng ứng dụng) là những người thụ hưởng dự định của các Thỏa thuận này và có quyền trực tiếp thực thi các Thỏa thuận chống lại bạn. Ngoài các quy định trong phần này, các Thỏa thuận không nhằm mục đích cấp quyền cho bất kỳ ai trừ bạn và TEST Y DƯỢC ONLINE và trong bất kỳ trường hợp nào, Thỏa thuận không cấu thành quyền thụ hưởng cho bên thứ ba nào. Ngoài ra, quyền chấm dứt, huỷ bỏ, hoặc đồng ý thay đổi, miễn trừ, hoặc thanh lý Thỏa thuận không phải là chịu sự đồng ý của bất kỳ người nào khác.
      </p>
      <h1>16. Toàn bộ thỏa thuận</h1>
      <p>
        Ngoài các quy định được nêu trong phần này hoặc được đồng ý rõ ràng bằng văn bản giữa bạn và TEST Y DƯỢC ONLINE, các Thỏa thuận này cấu thành toàn bộ điều khoản và điều kiện mà bạn và TEST Y DƯỢC ONLINE đã đồng ý và sẽ thay thế mọi thoả thuận trước đây liên quan đến các vấn đề được trình bày trong Thỏa thuận này, cho dù bằng văn bản hay lời nói.
      </p>
      <p>
        Tuy nhiên, xin lưu ý rằng các khía cạnh nhất định trong việc sử dụng Dịch vụ TEST Y DƯỢC ONLINE của bạn có thể được điều chỉnh bởi các thỏa thuận bổ sung. Trong đó có thể bao gồm, chẳng hạn như truy cập Dịch vụ TEST Y DƯỢC ONLINE bằng thẻ quà tặng, bản dùng thử miễn phí hoặc giảm giá, hoặc dùng chung cùng với các dịch vụ khác. Khi bạn được cung cấp một ưu đãi như vậy, bạn cũng sẽ nhận được bất kỳ thỏa thuận bổ sung có liên quan và có cơ hội đồng ý/từ chối với các điều khoản bổ sung. Một số điều khoản bổ sung được đăng trên trang web của TEST Y DƯỢC ONLINE. Trong trường hợp có bất kỳ xung đột không thể hòa hợp giữa điều khoản bổ sung và các Điều khoản này, các điều khoản bổ sung sẽ được áp dụng.
      </p>
      <h1>17. Hiệu lực từng phần, miễn trừ và diễn giải</h1>
      <p>
        Trừ khi có quy định khác trong Thỏa thuận, nếu bất kỳ điều khoản nào của các Thỏa thuận này được tuyên bố là không hợp lệ hoặc không thể thực thi vì bất kỳ lý do hoặc trong bất kỳ phạm vi nào thì điều đó cũng sẽ không làm ảnh hưởng hoặc làm mất hiệu lực hoặc không thi hành được các điều khoản còn lại của Thỏa thuận; việc áp dụng điều khoản đó sẽ được thi hành trong phạm vi được pháp luật cho phép.
      </p>
      <p>
        Việc TEST Y DƯỢC ONLINE hoặc bất kỳ người thụ hưởng bên thứ ba nào không thực thi các Thỏa thuận hoặc bất kỳ điều khoản nào của Thỏa thuận cũng sẽ không làm mất quyền thực thi các điều khoản đó.
      </p>
      <p>
        Như được sử dụng trong các Điều khoản này, từ “bao gồm”, “có” và các biến thể sẽ được theo sau bằng cụm “không giới hạn”.
      </p>
      <h1>18. Chuyển nhượng</h1>
      <p>
        TEST Y DƯỢC ONLINE có thể chuyển nhượng toàn bộ hoặc một phần Thỏa thuận này và các quyền lợi bất kỳ theo Thỏa thuận và TEST Y DƯỢC ONLINE có thể ủy thác bất kỳ nghĩa vụ nào của mình trong Thỏa thuận. Bạn không thể chuyển nhượng toàn bộ hoặc một phần Thoả thuận, không chuyển giao hoặc cấp lại quyền của bạn theo Thỏa thuận cho bất kỳ bên thứ ba nào khác.
      </p>
      <h1>19. Thỏa thuận bồi thường</h1>
      <p>
        Bạn đồng ý bồi thường và giữ vô hại cho TEST Y DƯỢC ONLINE trước mọi tổn thất, thiệt hại và chi phí dưới bất kỳ hình thức nào (bao gồm phí luật sư và chi phí hợp lý) phát sinh từ hoặc liên quan đến:
      </p>
      <p>
        (1) việc bạn vi phạm Thỏa thuận hoặc bất kỳ điều khoản nào trong Thỏa thuận;
      </p>
      <p>
        (2) bất kỳ Nội dung người dùng nào bạn đăng hoặc đóng góp;
      </p>
      <p>
        (3)bất kỳ hoạt động nào bạn tham gia hoặc thông qua Dịch vụ TEST Y DƯỢC ONLINE;
      </p>
      <p>
        (4) và vi phạm pháp luật hoặc các quyền của bên thứ ba.
      </p>
      <h1>20. Liên hệ với chúng tôi</h1>
      <p>
        Nếu bạn có bất kỳ thắc mắc nào liên quan đến Dịch vụ TEST Y DƯỢC ONLINE hoặc các Thỏa thuận này, vui lòng liên hệ phòng Dịch vụ Khách hàng TEST Y DƯỢC ONLINE thông qua địa chỉ email hoặc zalo đã được công khai trên trang web của chúng tôi.
      </p>
      <p>Xin cám ơn bạn đã đọc Điều khoản của chúng tôi. Chúng tôi hy vọng bạn sẽ thích TEST Y DƯỢC ONLINE!</p>
      <p>Bên ký kết hợp đồng:</p>
      <p>TEST Y DƯỢC ONLINE</p>
    </React.Fragment>
  )
}

class Term extends Component {
  constructor() {
    super();
    this.state = {
      term: false,
      university: "",
      error: false
    };
  }

  onChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      error: false
    });
  }
  onClick = async e => {
    const { term, university } = this.state;
    const { history } = this.props;
    if (term && university) {
      var data = {
        token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
        ...this.state
      };
      var json = await axios({
        method: "POST",
        url: `${API}/login-google/updateAccount`,
        data: data
      }).catch(err => {
        console.error(err);
      });
      if (json) {
        const { data } = json;
        if (data.status == 'success' && window.confirm("Cám ơn bạn đã quan tâm các điều khoản này.")) {
          localStorage.setItem("term", 1);
          history.push("/home");
        }
      }
    } else {
      this.setState({
        error: true
      })
    }
  }
  render() {
    var { term } = this.state;
    return (
      <section className="ol-content" style={{marginTop:"10px"}}>
        <SecBreadcrumb />
        <Container>
          <div className="page__wrapper">
            <div className="term">
              <Row>
                <Col md={12} style={{border: "#333 solid 1px"}}>
                  <div className="InformationTerm">
                    <InformationTerm />
                  </div>
                </Col>
                <Col md={6} style={{paddingTop:"10px"}}>
                  <InputGroup style={{ display: "grid", gridTemplateColumns: "auto 1fr" }}>
                    <InputGroupAddon style={{ lineHeight: "30px", paddingRight: "12px" }}>Tên trường học</InputGroupAddon>
                    <Input placeholder="Nhập tên trường ..." name="university" onChange={this.onChange} value={this.state.university} />
                  </InputGroup>
                </Col>
                <Col md={12} style={{paddingTop:"10px"}}>
                  <InputGroup style={{ display: "grid", gridTemplateColumns: "auto 1fr" }}>
                    <InputGroupAddon style={{ lineHeight: "30px", paddingRight: "12px" }}>
                      <input
                        type="checkbox"
                        name="term"
                        checked={term}
                        onChange={this.onChange}
                      />
                    </InputGroupAddon>
                    <p style={{ lineHeight: "30px" }}>
                      Tôi đã đọc và đồng ý với các quy định/điều khoản người dùng của trang web
                    </p>
                  </InputGroup>
                </Col>
                <Col md={12}>
                  {this.state.error ? <p style={{ color: "red" }}>Bạn vui lòng chọn đầy đủ thông tin</p> : ""}
                </Col>
                <Col md={12}>
                  <Button className="btn btn_primary" onClick={this.onClick}>Đồng ý</Button>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </section>
    );
  }
}
export default Term;
