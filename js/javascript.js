
//----------------------- variable----------------//

let coursesLists  = document.querySelector('#courses-list');
let cartContent = document.getElementById('cart-content') ;
let footer = document.querySelector('#footer');
let footerListEement = footer.querySelectorAll('.link');
let localStorageCourses = getFromLocalStorage();
let shoppingCart = document.getElementById('shopping-cart');


//----------------------- EcventListener ------------------//


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
    document.querySelector('#cart-total-content').firstElementChild.innerText = "Total: 0";
    document.querySelector('#cart-total-content').lastElementChild.innerText ="Item : 0";;  
   }
}

function removeElement(event)
{
    if(event.target.classList.contains('removedItam'))
    {
         let removeItem = event.target.getAttribute('id'); 
         event.target.parentElement.remove();
         removeItemFromLocalStorage(removeItem);
         cartCalculation();
    }
}

function removeItemFromLocalStorage(id)
{
    localStorageCourses.forEach(function(value ,index)
    {
           if(value.id == id)
           {
               localStorageCourses.splice(index,1);
           }
           localStorage.clear();
           localStorage.setItem("coruces",JSON.stringify(localStorageCourses));

    });


}
 function cartCalculation()
{
     document.querySelector('#cart-total-content').firstElementChild.innerText = "Total :"+ TotalAmount();
     document.querySelector('#cart-total-content').lastElementChild.innerText ="Item  :"+ totalItam();;   
}

function totalItam()
{
     let count = 0 ;
     localStorageCourses.forEach(function(value ,ind)
     {
        count ++ ;
     })
     return count ; 
}

function TotalAmount()
{
    let total = 0 ;
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
     if(event.target.classList.contains("add-to-cart") && checkDuplicate(clickId) )
     {
         let course = event.target.parentElement.parentElement;
         getCourseCoutent(course);

     }
      else 
     {
          alert("already added");
     }
          
};

function checkDuplicate(clickId)
{
     let ok = true ;

     localStorageCourses.forEach(function(value)
     {

          if(value.id == clickId)
          {
               ok = false;
          }
     });
     return ok ;
}

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
    cartCalculation();
    

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
      <td id="${courseContent.id}" class =" removedItam text-danger">X</td>
    `;
     cartContent.querySelector('tbody').appendChild(tr);
     imageStyle(cartContent.querySelector('tbody'));

}

let setIntoLocalStorage = function(courseContent)
{ 
     
     localStorageCourses.push(courseContent);
     localStorage.setItem("coruces",JSON.stringify(localStorageCourses)); 

   
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






