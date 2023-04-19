
//----------------------- variable----------------//
let localStorageCourses = getFromLocalStorage();
let tbody = $('#cart-content').find('tbody');
//----------------------- EcventListener ------------------//
eventListeners();

function eventListeners()
{
    
     $('#courses-list').on('click',buyCourses);
     cartCalculation();
     addEletemtFromLocalStorage();
     $('#cart-content').on('click',removeElement);
     $('#shopping-cart').on('click',removeAllElement)
     

}

//-------------------- function --------------//

let getCourseCoutent = function(course)
{
     const courseContent ={
     id: $(course).children().children('a').attr('data-id'),
     image : $(course).children('img').attr('src'),
     name  :$(course).children().children('p')[0].textContent,
     price :$(course).children().children('p').children()[0].textContent,

     }    
     addToCard(courseContent);
}


let localStoragegetElement = function(courseContent)
{

     let tr = $('<div></<div>');
     tr.html( 
    ` <td><img  class="imgStyle" src="${courseContent.image}" alt="no image"></td>
      <td>${courseContent.name}</td>
      <td>${courseContent.price}</td>
      <td id="${courseContent.id}" class =" removedItam text-danger">X</td>
    `);
     tbody.append(tr);
   
     imageStyle($('#cart-content').find('tbody'));

}
function addEletemtFromLocalStorage()
{  
     localStorageCourses.forEach(function(value)
     {
          let tr = $('<div></<div>');
          tr.html( 
         ` <td><img  class="imgStyle" style="
            border-radius: 10% ;
            hight: 100px;
            width :75px;
            border : 2px solid;
         " src="${value.image}" alt="no image"></td>
           <td>${value.name}</td>
           <td>${value.price}</td>
           <td id="${value.id}" class =" removedItam text-danger">X</td>
         `);
          tbody.append(tr);
     });
}

let addToCard = function(courseContent)
{
      localStoragegetElement(courseContent);
      setIntoLocalStorage(courseContent); 
      cartCalculation();
    

}



function buyCourses(event)
{
      event.preventDefault();
      let targetId = $(event.target).attr('data-id');
      if($(event.target).hasClass('add-to-cart') && checkDuplicate(targetId))
     {
         getCourseCoutent($(event.target).parent().parent());
     }
      else if( $(event.target).hasClass('add-to-cart'))
     {
          alert("already added");
     }       
};


function checkDuplicate(clickId)
{
     let exist = true ;

     localStorageCourses.forEach(function(value)
     {

          if(value.id == clickId)
          {
               exist = false;
          }
     });
     return exist ;
}


function removeAllElement(event)
{
   if($(event.target).attr('id') == 'clear-cart'){
    tbody.remove();
    localStorage.removeItem("coruces");
    $('#cart-total-content').children()[0].textContent =  "Total : 0";
    $('#cart-total-content').children()[1].textContent ="Item  : 0"; 
   }
}

function removeElement(event)
{
    if($(event.target).hasClass('removedItam'))
    {

        let removeItem = $(event.target).attr('id');
        $(event.target).parent().hide();
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
    $('#cart-total-content').children()[0].textContent =  "Total :"+ TotalAmount();
    $('#cart-total-content').children()[1].textContent ="Item  :"+ totalItam();   
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
    $(image).find('.imgStyle').css({"borderRadius" : "10%", "hight":"100px","width":"75px"  ,"border": "2px solid"});
    
}

// -----------------------------footer area --------------------//
$('.link').each(function(index,value)
{
     if(index %2)
     {
          $(value).addClass('text-primary');
     }else{

          $(value).addClass('text-success');
     }
}) ;





