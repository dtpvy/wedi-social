import React from 'react'
import Post from '../Post/Post'

const det = 
[
    {
        id :1,
        avatar : "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/332705328_506795408279456_8127753015628393035_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=UznAUwZeLrAAX_OSV9d&_nc_ht=scontent.fsgn2-4.fna&oh=00_AfAqafVp-tWjWxPb4r0Nb0TsVdTh7DEfTE3HzAv-EiMnGA&oe=642744FC",
        userName: "Phuong Zy",
        text : "Huế siu đẹp lun nha mng,nên đến 1 lần ",
        img: "https://vietsensetravel.com/view/at_nen-di-du-lich-hue-vao-thang-nao_5a06d2932d1bc437a73d2d3eaf127369.jpg",
        location : "Huế,Việt Nam"
    },
    {
        id :2,
        avatar : "https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/328037796_714902076837615_5252904389480504852_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=u0BPLlLSLaQAX_Og_wy&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfA1nksIOS4l109JsR0CvjpuyuSJWPA60229oe8diJ38Gw&oe=6427024A",
        userName: "Vinh Quang",
        text : "Cứu,tui bị bán qua Trung Quốc rồi",
        img: "https://www.kynghidongduong.vn/userfiles/images/Tour%20Quang%20Chau/chau-giang-quang-chau-kynghidongduong.vn.jpg",
        location : "Quảng Châu,Trung Quốc"
    },
    {
        id :3,
        avatar : "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/334275316_223313156832007_5343714432351558122_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=rnH78zwhZu0AX-WBxVM&_nc_ht=scontent.fsgn2-4.fna&oh=00_AfCW0PMadG8Vc7pMWe-kI-FOUDv3cz-_lXFs5fjWG0Uyzg&oe=6427B829",
        userName: "Chó Pháp",
        text : "Hà Nội lạnh quáaaaaa",
        img: "https://i1-dulich.vnecdn.net/2022/05/12/Hanoi2-1652338755-3632-1652338809.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=NxMN93PTvOTnHNryMx3xJw",
        location : "Hà Nội,Việt Nam"
    }

]
const Main = () => {
  return (
    <div className="flex flex-col p-4 gap-4">
      {det.map((det) => (
        <div key={det.id} className="flex-1">
          <Post post={det} />
        </div>
      ))}
    </div>
      
    
  );
}

export default Main