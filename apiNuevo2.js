let btnusers=document.getElementById('btnusers');
btnusers.addEventListener('click',()=>
    {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((json) =>
            {
                let select=document.getElementById("selectuser");
                console.log(json);
                let lista="";
                for(let i=0;i<json.length;i++)
                    {
                        lista+="<option value='"+json[i].id+"'>" + json[i].name + "</option>";
                        select.innerHTML=lista;
                    }
            });
    });

let select=document.getElementById("selectuser");
select.addEventListener('change',()=>
    {
        let userId=document.getElementById("selectuser").value;
        fetch('https://jsonplaceholder.typicode.com/posts?userId=' + userId)
        .then((response)=> response.json())
        .then((json)=> 
            {
                console.log(json)
                let infodiv=document.getElementById("info");
                let listainfo="";
                listainfo+=`
                                <br>
                                <button type="button" id="datosusuario" onclick="UploadData(${userId})" >Show datos</button>
                                <br>
                                <div id="datos"></div>
                            `;

                for(let i=0;i<json.length;i++)
                    {
                        listainfo+=`
                                        <div class="selectinfo">
                                        <h3>${json[i].title}</h3>
                                        <p>${json[i].body}</p>
                                        <button class="comments" type="button" id="btncomments" onclick="Comments(${json[i].id})" >Show comments</button>
                                        <br>
                                        <div id="comm${json[i].id}"></div>
                                        </div>`;
                                        
                        infodiv.innerHTML="";
                        infodiv.innerHTML=listainfo;
                    }
            });
    });

let Comments = (postid) =>
    {
        let comm=document.getElementById("comm" + postid);
        fetch('https://jsonplaceholder.typicode.com/comments?postId=' + postid)
        .then((response) => response.json())
        .then((json) =>
                {
                    let lista='<br>' + '<button type="button" id="btnquitarcomments" onclick="quitarcomments(' + postid + ')">Quitar comments</button>';
                    for(let i=0;i<json.length;i++)
                    {
                        lista+=`
                                <div class="comments"; id="idcomm${json[i].id}">
                                <h3> ${json[i].name} </h3>
                                <h4> ${json[i].email} </h4>
                                <p> ${json[i].body} </p>
                                </div>
                            `;
                    }
                    comm.innerHTML=lista;
                });
    };

let quitarcomments = (postid) =>
    {
        let comm=document.getElementById(`comm${postid}`);
        comm.innerHTML="";
    };


let UploadData = (UserId) =>
    {
        let User=document.getElementById('datos');
        User.innerHTML="";
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((json) =>
                {
                    let Datos="";
                    for(let i=0;i<json.length;i++)
                    {
                        if(json[i].id===UserId)
                            {
                                Datos=`
                                        <div class="datos"; id="idcomm${json[i].id}">
                                        <h3> ${json[i].username} </h3>
                                        <h4> ${json[i].address.street} </h4>
                                        <h4> ${json[i].address.suite} </h4>
                                        <h4> ${json[i].address.city} </h4>
                                        <h4> ${json[i].address.zipcode} </h4>
                                        <h4> ${json[i].phone} </h4>
                                        <button type="button" id="btncerrardatos" onclick="Cerrardatos()">Cerrar</button>
                                        </div>
                                    `;
                            }
                    }
                    User.innerHTML=Datos;
                });
    };

let Cerrardatos = () =>
    {
        let Data=document.getElementById('datos');
        Data.innerHTML="";
    };