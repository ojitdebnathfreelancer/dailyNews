const AllNews = async () => {
    loader(true);
    const res = await fetch('https://openapi.programming-hero.com/api/news/category/04');
    const data = await res.json();
    return data;

}
// all news information get by above function 

const loader = isLoad =>{
    const loader = document.getElementById('page-loader');
    if(isLoad){
        loader.classList.remove('d-none');
    }
    else{
        loader.classList.add('d-none');
    }
}
// loader funtion above 

const homeNews = async () => {
    const allNewsInfo = await AllNews();
    const totalNewsAmount = allNewsInfo.data.length;
    const totalNews = document.getElementById('total-news');
    const addItems = document.getElementById('add-items');

    // sort try starts 
    const allArray = allNewsInfo.data;
    allArray.sort(function(a,b){
        return a.total_view - b.total_view;
    });
    allArray.reverse();
    // sort try ends 

    allArray.forEach(element =>{
        const {author, title, thumbnail_url, details, total_view, category_id,_id} = element;
        const {name, published_date, img} = author;
        totalNews.innerText = totalNewsAmount + ' ' + 'items found for sports news category';
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('bg-light', 'mt-3', 'rounded', 'p-4');
        itemDiv.innerHTML = `
        <div class="row">
        <div class="col-lg-2">
            <img class="img-fluid" src=${thumbnail_url}>
        </div>
        <div class="col-lg-10 d-flex flex-column justify-content-between">
            <h3>${title}</h3>
            <p>${details.slice(0,250)}</p>
            <p>${details.slice(250, 500)} <span class="text-info">read more........</span></p>
            <div class="d-flex justify-content-between align-items-center">
                <div class="author d-flex align-items-center"> 
                    <div>
                        <img class="img-fluid" style="height:50px; width:50px" src=${img} alt="">
                    </div>
                    <div class="fw-bold ms-2">${name === null ? 'No data' : name}</div>
                </div>
                <div class="view"> <span class="fw-bold"><i class="fa-solid fa-eye me-2"></i>${total_view === null ? 'No data': total_view} </span> </div>
                <div class="star fw-bold">
                    <i class="fa-solid fa-star-half-stroke"></i> 
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </div>
                <div class="arrow fw-bold fs-3"><a onclick="detailsNewsInfo('${_id}')"><i data-bs-toggle="modal" data-bs-target="#exampleModal" class="fa-solid fa-arrow-right"></i></a></i></div>
            </div>
        </div>
    </div>
        `;
        addItems.appendChild(itemDiv);
    })
    loader(false);
}
homeNews();
// add news list function 



const detailsNewsInfo = async(id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/news/${id}`);
    const data = await res.json();
    detailsNews(data);
}
// details news info funtiosn 

const detailsNews = (info) =>{
    console.log(info.data[0]);
    const {author,details,image_url,title,} = info.data[0];
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = title;
    const modalImg = document.getElementById('modal-img');
    modalImg.innerHTML = `
    <img class="img-fluid" src=${image_url} alt="">
    `;
    const detail = document.getElementById('detisl');
    detail.innerText = details;
}

// details news add on modal 

