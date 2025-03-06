document.
        getElementById("teste")
        .addEventListener("click",function(event){
            event.preventDefault();

            fetch("http://localhost:8080/userdelete",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                  },
            })
            .then((response)=>response.json())
            .then((data)=>{
                console.log(data)
            })
            .catch((error) => {
                console.error("Erro:", error);
              });
        })