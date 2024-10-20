const URL_API = `http://localhost:3000`;
type TLoai = {
  id;
  number;
  ten_loai;
  string;
  thu_tu: number;
  an_hien: number;
};
interface Binh_Luan {
  id: number;
  id_sp: number;
  noi_dung: string;
  ngay: string;
  ho_ten: string;
  ten_loai: string;
  img_url: string;
}
type TSanPham = {
  id: number;
  ten_sp: string;
  gia: number;
  gia_km: number;
  hinh: string;
};
export const lay_loai = async () => {
  //async che do hoat dong bat dong bo
  let loai_arr: TLoai[];
  loai_arr = await fetch(URL_API + "/loai")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    });
  let kq = ``;
  loai_arr.forEach((loai) => {
    kq += `<li> <a href="sptrongloai.html?id=${loai.id}">${loai.ten_loai}</a> </li>`;
  });
  console.log(loai_arr);
  return kq;
};

export const lay_ten_loai = async (id) => {
  let loai: TLoai;
  try {
    loai = await fetch(URL_API + `/loai/${id}`)
      .then((res) => res.json())
      .then((d) => d);
  } catch (err) {
    return `Không có .  (Không có loại ${id})`;
  }
  return `${loai.ten_loai}`;
};

export const code_mot_sp = (sp) => {
  return `
 
  <div class="sp">
      
      <img src="${sp.hinh}">
      <h3>${sp.ten_sp}</h3>
      <div class ="goc">
      <p >Giá gốc: ${Number(sp.gia).toLocaleString("vi")}</p>
      </div>
      <div class="discount">
      <p class="disscount">Khuyến mãi: ${Number(sp.gia_km).toLocaleString(
        "vi"
      )}</p>
        </div>     
  </div>
`;
  // <p>Cập nhật: ${new Date(sp.ngay).toLocaleDateString("vi")}</p>
};
export const lay_sp_trong_loai = async (id) => {
  //async che do hoat dong bat dong bo
  let sp_arr: TSanPham[];
  sp_arr = await fetch(URL_API + `/san_pham?id_loai=${id}`).then((res) =>
    res.json()
  );

  let kq = ``;
  sp_arr.forEach((sp) => {
    kq += code_mot_sp(sp);
  });

  return kq;
};

export const lay_sp = async (so_sp) => {
  //async che do hoat dong bat dong bo
  let sp_arr: TSanPham[];
  sp_arr = await fetch(`${URL_API}/san_pham?_sort=-ngay&_limit=${so_sp}`)
    .then((res) => res.json())
    .then((data) => data);
  let kq = ``;
  sp_arr.forEach((sp) => {
    kq += code_mot_sp(sp);
  });

  return kq;
};
export const sp_noi_bat = async (so_sp) => {
  //async che do hoat dong bat dong bo
  let sp_arr: TSanPham[];
  sp_arr = await fetch(URL_API + `/san_pham?hot=1&_limit=${so_sp}`)
    .then((res) => res.json())
    .then((data) => data);
  let kq = ``;
  sp_arr.forEach((sp) => {
    kq += code_mot_sp(sp);
  });

  return kq;
};
export const sp_ban_chay = async (so_sp) => {
  //async che do hoat dong bat dong bo
  let sp_arr: TSanPham[];
  sp_arr = await fetch(URL_API + `/san_pham?ban_chay=1&_limit=${so_sp}`)
    .then((res) => res.json())
    .then((data) => data);
  let kq = ``;
  sp_arr.forEach((sp) => {
    kq += code_mot_sp(sp);
  });

  return kq;
};

export const lay_binh_luan = async (so_bl = 6) => {
  let url_binh_luan = URL_API + `/binh_luan?_sort=-ngay&_limit=${so_bl}`;
  let url_san_pham = URL_API + `/san_pham`; // API để lấy danh sách sản phẩm

  // Lấy danh sách bình luận
  let bl_arr: Binh_Luan[] = await fetch(url_binh_luan)
    .then((res) => res.json())
    .then((d) => d);

  // Lấy danh sách sản phẩm
  let sp_arr: TSanPham[] = await fetch(url_san_pham)
    .then((res) => res.json())
    .then((d) => d);

  let str = ``;

  bl_arr.forEach((bl) => {
    // Tìm sản phẩm dựa trên id_sp
    let san_pham = sp_arr.find((sp) => sp.id === bl.id_sp);

    // Nếu tìm thấy sản phẩm, lấy tên sản phẩm, nếu không thì ghi "Sản phẩm không xác định"
    let ten_san_pham = san_pham ? san_pham.ten_sp : "không có";

    // Tạo nội dung bình luận
    str += `<div class="bl">
    <img src="${bl.img_url}" alt="Hình ảnh bình luận" class="img-binh-luan"/>
    <h5>${bl.ho_ten}  
        <span class="ngay-dang"><strong>Ngày đăng:</strong> ${new Date(
          bl.ngay
        ).toLocaleDateString("vi")} ${new Date(bl.ngay).toLocaleTimeString(
      "vi"
    )}</span>
    </h5>
    <p class="noi-dung"><strong>Nội dung:</strong> ${bl.noi_dung}</p>
    <p class="san-pham"><strong>Sản phẩm:</strong> ${ten_san_pham}</p>
</div>`;
  });

  return str;
};
