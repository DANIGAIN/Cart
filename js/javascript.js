
//----------------------- variable----------------//

let coursesLists  = document.querySelector('#courses-list');
let cartContent = document.getElementById('cart-content') ;
let footer = document.querySelector('#footer');
let footerListEement = footer.querySelectorAll('.link');
let localStorageCourses = getFromLocalStorage();
let shoppingCart = document.getElementById('shopping-cart');
let cartId  = getIdFromLocalStorage();
let total = 0 ;

//----------------------- EventListener ------------------//


eventListeners();

function eventListeners()
{
     coursesLists.addEventListener('click',buyCourses);
     document.addEventListener('DOMContentLoaded', addEletemtFromLocalStorage);
     document.addEventListener('DOMContentLoaded', cartCalculation);
     cartContent.addEventListener('click',removeElement);
     shoppingCart.addEventListener('click',removeAllElement)
     

}

//-------------------- function --------------//


function removeAllElement(event)
{
   if(event.target.getAttribute('id') == 'clear-cart'){
    cartContent.remove();
    localStorage.removeItem("coruces");
    localStorage.removeItem("dataId");

   }
}

function removeElement(event)
{
     let removeItem = event.target.getAttribute('id'); 
     event.target.parentElement.remove();
     removeItemFromLocalStorage(removeItem);
}

function removeItemFromLocalStorage(id)
{
    let tamp  =  localStorageCourses.filter(coruces => coruces.id != id);
    let tampID  = cartId.filter(dataId => dataId != id);

    
    localStorage.setItem("coruces",JSON.stringify(tamp));
    localStorage.setItem("dataId",JSON.stringify(tampID));

}

 function cartCalculation()
{
     let cartContent = document.getElementById('cart-content').parentElement.parentElement.firstElementChild;

     let div = document.createElement('div');
     div.setAttribute("style","float:right");
     div.innerHTML=
     `
           <span style="font-size:15px;">Total :${ TotalAmount()+ "  "}</span>
           <span style="font-size:15px;">Item  :${getIdFromLocalStorage().length}</span>
     `;
     cartContent.append(div);
}

function TotalAmount()
{
     
     localStorageCourses.forEach(function(value)
     {
          total += parseInt(value.price.slice(1));
     });
     return total ;

}

function buyCourses(event)
{

     
     event.preventDefault();
     let clickId = parseInt(event.target.getAttribute("data-id"));
     if(event.target.classList.contains("add-to-cart") && cartId.indexOf(clickId) <  0  )
     {
         let course = event.target.parentElement.parentElement;
         getCourseCoutent(course);

     }
      else 
     {
          alert("already added");
     }
          
};

let getCourseCoutent = function(course)
{
     const courseContent ={
     id: course.lastElementChild.querySelector('a').getAttribute('data-id'),
     image :course.firstElementChild.getAttribute('src'),
     name  :course.lastElementChild.firstElementChild.nextElementSibling.innerText,
     price :course.lastElementChild.querySelector('p span').innerText,

     }    
     addToCard(courseContent);
}


let addToCard = function(courseContent)
{
    localStoragegetElement(courseContent);
    setIntoLocalStorage(courseContent);
}

function addEletemtFromLocalStorage()
{
     localStorageCourses.forEach(localStoragegetElement);
}
let localStoragegetElement = function(courseContent)
{
     let tr = document.createElement('tr');
    
     tr.innerHTML = 
    ` <td><img  class="imgStyle" src="${courseContent.image}" alt="no image"></td>
      <td>${courseContent.name}</td>
      <td>${courseContent.price}</td>
      <td id="${courseContent.id}" class ="text-danger">X</td>
    `;
     cartContent.querySelector('tbody').appendChild(tr);
     imageStyle(cartContent.querySelector('tbody'));

}

let setIntoLocalStorage = function(courseContent)
{ 
     
     localStorageCourses.push(courseContent);
     localStorage.setItem("coruces",JSON.stringify(localStorageCourses)); 

     // set index array -- >
     let x  = parseInt(courseContent.id);
     cartId.push(x); 
     localStorage.setItem("dataId",JSON.stringify(cartId)); 
}
 function getFromLocalStorage()
{
     let  coruces = localStorage.getItem('coruces');
     
     if(!coruces)
     {
          return [];

     }else{
          
          return JSON.parse(coruces);
     }


}

function getIdFromLocalStorage()
{
        //get index 
        let dataId = localStorage.getItem('dataId');
        if(!dataId)
        {
             return [];
        }else 
        {
          return JSON.parse(dataId);
        }
}



// --------------------- design card image ------------------//

let imageStyle = function(image)
{
     let imageElement = image.querySelectorAll('.imgStyle');
     imageElement.forEach(imageFunction);
}

let imageFunction = function(value, ind)
{
    value.style.borderRadius = "10%";
    value.style.hight = "100px";
    value.style.width = "75px";
    value.style.border = "2px solid"

}



// -----------------------------footer area --------------------//

footerListEement.forEach(function(val ,ind)
{

     if(ind%2)
     {
          val.classList.add("text-success");
     }else 
     {
          val.classList.add("text-info");
     }
});  






