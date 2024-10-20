const URL_API = `http://localhost:3000`;
export const lay_loai = async () => {
    let loai_arr;
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
    let loai;
    try {
        loai = await fetch(URL_API + `/loai/${id}`)
            .then((res) => res.json())
            .then((d) => d);
    }
    catch (err) {
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
      <p class="disscount">Khuyến mãi: ${Number(sp.gia_km).toLocaleString("vi")}</p>
        </div>     
  </div>
`;
};
export const lay_sp_trong_loai = async (id) => {
    let sp_arr;
    sp_arr = await fetch(URL_API + `/san_pham?id_loai=${id}`).then((res) => res.json());
    let kq = ``;
    sp_arr.forEach((sp) => {
        kq += code_mot_sp(sp);
    });
    return kq;
};
export const lay_sp = async (so_sp) => {
    let sp_arr;
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
    let sp_arr;
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
    let sp_arr;
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
    let url_san_pham = URL_API + `/san_pham`;
    let bl_arr = await fetch(url_binh_luan)
        .then((res) => res.json())
        .then((d) => d);
    let sp_arr = await fetch(url_san_pham)
        .then((res) => res.json())
        .then((d) => d);
    let str = ``;
    bl_arr.forEach((bl) => {
        let san_pham = sp_arr.find((sp) => sp.id === bl.id_sp);
        let ten_san_pham = san_pham ? san_pham.ten_sp : "không có";
        str += `<div class="bl">
    <img src="${bl.img_url}" alt="Hình ảnh bình luận" class="img-binh-luan"/>
    <h5>${bl.ho_ten}  
        <span class="ngay-dang"><strong>Ngày đăng:</strong> ${new Date(bl.ngay).toLocaleDateString("vi")} ${new Date(bl.ngay).toLocaleTimeString("vi")}</span>
    </h5>
    <p class="noi-dung"><strong>Nội dung:</strong> ${bl.noi_dung}</p>
    <p class="san-pham"><strong>Sản phẩm:</strong> ${ten_san_pham}</p>
</div>`;
    });
    return str;
};
