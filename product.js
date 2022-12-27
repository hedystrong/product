let products = [];

fillData();

function fillData(){
    fetch("https://dummyjson.com/products")
        .then((response) => response.json())
        .then((data) => {
          products = [...data];

        })
    .catch((err) => console.log(err));    
}
console.log();