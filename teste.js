var array = [{id :1, name :"test1"},{id :2, name :"test2"},{id :3, name :"test3"},{id :4, name :"test4"}];

var anotherOne = [{id :2, name :"test2"}, {id :4, name :"test4"}];

var filteredArray  = array.filter(function(array_el){
   return anotherOne.filter(function(anotherOne_el){
      return anotherOne_el.id == array_el.id;
   }).length == 0
});
