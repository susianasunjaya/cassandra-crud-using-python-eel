document.getElementById("button-home").addEventListener("click", ()=>{eel.select()}, false);

eel.expose(prompt_alerts);
function prompt_alerts(description) {
  alert(description);
}

// add data

function add(){
  var judul = document.getElementById('judul').value;
  var penulis = document.getElementById('penulis').value;
  var penerbit = document.getElementById('penerbit').value;
  eel.insert(judul, penulis, penerbit);
}

// Go to homepage
function homepage(){
  window.location.href = "index.html";

}

// Go to addpage
function addpage(){
  window.location.href = "add.html";
}


// Update data
function update(){
  var locationsub = location.search.substring(1);
  var split = locationsub.split("|");
  var id = split[0];
  var judul = document.getElementById('judul').value;
  var penulis = document.getElementById('penulis').value;
  var penerbit = document.getElementById('penerbit').value;
  eel.update(id,judul,penulis,penerbit);
  
}

// Autofill halaman update
function autofill(){
  var locationsub = location.search.substring(1);
  if(locationsub.includes("|")){
    var split = locationsub.split("|");
    var id = split[0];
    var judul = split[1];
    var penulis = split[2];
    var penerbit = split[3];
    document.getElementById('id').value = id;
    document.getElementById('judul').value = judul.replaceAll("%20"," ");
    document.getElementById('penulis').value = penulis.replaceAll("%20"," ");
    document.getElementById('penerbit').value = penerbit.replaceAll("%20"," ");

  }else{
    window.location.href ="index.html"
  }

}

// Delete item
eel.expose(deleteitem)
function deleteitem(id_del){
  eel.delete(id_del.trim());
}

// Create table 
eel.expose(showtable)
function showtable(){
  
  let table = document.createElement('table');
  table.className = "table table-striped table-dark";
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');

  table.appendChild(thead);
  table.appendChild(tbody);

  document.getElementById('body').appendChild(table);

  

  // Creating and adding data to first row of the table
  let row_1 = document.createElement('tr');
  let heading_1 = document.createElement('th');
  heading_1.innerHTML = "Judul Buku";
  let heading_2 = document.createElement('th');
  heading_2.innerHTML = "Penulis";
  let heading_3 = document.createElement('th');
  heading_3.innerHTML = "Penerbit";
  let heading_4 = document.createElement('th');
  heading_4.innerHTML = "Actions";

  row_1.appendChild(heading_1);
  row_1.appendChild(heading_2);
  row_1.appendChild(heading_3);
  row_1.appendChild(heading_4);
  thead.appendChild(row_1);

  eel.select()(function(databuku){
    for(let i=0;i< databuku[0].length;i++){
      // Creating and adding data to another row of the table
      let row_2 = document.createElement('tr');
      let row_2_data_1 = document.createElement('td');
      row_2_data_1.innerHTML = databuku[1][i];
      let row_2_data_2 = document.createElement('td');
      row_2_data_2.innerHTML = databuku[2][i];
      let row_2_data_3 = document.createElement('td');
      row_2_data_3.innerHTML = databuku[3][i]
      let row_2_data_4 = document.createElement('td');
      id_buku = databuku[0][i];
      row_2_data_4.innerHTML = '<a href="index.html" id="button-del" onClick="deleteitem('+"'"+id_buku+"'"+')">Delete</a>'+" | "+ '<a href="update.html?'+id_buku+'|'+databuku[1][i]+'|'+databuku[2][i]+'|'+databuku[3][i]+'" id="button-update">Update</a>';   
  
      row_2.appendChild(row_2_data_1);
      row_2.appendChild(row_2_data_2);
      row_2.appendChild(row_2_data_3);
      row_2.appendChild(row_2_data_4);
      tbody.appendChild(row_2);
    }
  })
}
