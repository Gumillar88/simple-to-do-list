const picker = new MaterialDatePicker({})
  .on('submit', (d) => {
    output.innerText = d;

    var c = $("#output").text();
    console.log(" nilai nya : " + c);
  });

const el = document.querySelector('.c-datepicker-btn');
el.addEventListener('click', () => {
  picker.open();
}, false);

function todolist(){

    if (localStorage.list_data && localStorage.id_data){

        list_data = JSON.parse(localStorage.getItem('list_data'));
        
        var data_app = "";
        
        if (list_data.length > 0){
            data_app = '';
            data_app = '<table class="table" width="100px">';
            data_app += '<thead>'+
                                '<th>No</th>'+
                                '<th>All Task</th>'+
                                '<th>Date</th>'+
                                '<th>Goals</th>'+
                                '<th>Action</th>'+
                              '</thead><tbody>';
             var no = 1;                 
            for (i in list_data){
                data_app += '<tr>';
                data_app += '<td>'+ no + ' </td>'+
                                  '<td>'+ list_data[i].Task + ' </td>'+
                                  '<td>'+ list_data[i].Dates + ' </td>'+
                                  '<td>'+ list_data[i].goalstarget + ' </td>'+
                                  '<td><a class="btn btn-warning btn-small" href="javascript:void(0)" onclick="editData(\''+list_data[i].id_data+'\')">edit</a><a class="btn btn-danger btn-small" href="javascript:void(0)" onclick="deleteData(\''+list_data[i].id_data+'\')">done</a></td>';
                data_app += '</tr>';
                no++;
                
            }
           data_app += '</tbody></table>';
       
        }
        else {
            data_app = "no Task available...";
        }
       
        
        $('#list-data').html(data_app);
        $('#list-data').hide();
        $('#list-data').fadeIn(100);
    }
}

function editData(id){

    if (localStorage.list_data && localStorage.id_data){
        list_data = JSON.parse(localStorage.getItem('list_data'));          
        idx_data = 0;
        for (i in list_data){
            if (list_data[i].id_data == id){
                $("#id_data").val(list_data[i].id_data);
                $("#plan").val(list_data[i].Task);
                $("#date-update").val(list_data[i].Dates);
                $("#target").val(list_data[i].goalstarget);
                list_data.splice(idx_data, 1);
            }
            idx_data ++;
        }
        changeMenu('edit-list');
        
    }
    
}


function saveData(){
    Task = $('#task-text').val();
    Dates = $('#output').text();
    goalstarget = $('#goals-target').val();
    
    if (localStorage.list_data && localStorage.id_data){
        list_data = JSON.parse(localStorage.getItem('list_data'));
        id_data = parseInt(localStorage.getItem('id_data'));
    }
    else {
        list_data = [];
        id_data = 0;
    }

    id_data ++;
    list_data.push({'id_data':id_data, 'Task':Task, 'Dates':Dates, 'goalstarget':goalstarget});
    localStorage.setItem('list_data', JSON.stringify(list_data));
    localStorage.setItem('id_data', id_data);
    document.getElementById('form-data').reset();
    changeMenu('list-data');
    
    return false;

    
}

function updateData(){
    id_data = $('#id_data').val();
    Task = $('#plan').val();
    Dates = $('#date-update').val();
    goalstarget = $('#target').val();
    
    list_data.push({'id_data':id_data, 'Task':Task, 'Dates':Dates, 'goalstarget':goalstarget});
    localStorage.setItem('list_data', JSON.stringify(list_data));
    document.getElementById('eform-data').reset();
    changeMenu('list-data');
    
    return false;
}

function deleteData(id){
    if (confirm('if you have completed your work press "Ok".!! ,and if you have not completed press "Cancel".!!')) {

        if (localStorage.list_data && localStorage.id_data){
            list_data = JSON.parse(localStorage.getItem('list_data'));
            
            idx_data = 0;
            for (i in list_data){
                if (list_data[i].id_data == id){
                    list_data.splice(idx_data, 1);
                }
                idx_data ++;


            }
           
            localStorage.setItem('list_data', JSON.stringify(list_data));
            // localStorage.clear('list_data', JSON.stringify(list_data));
            todolist();
        }
        console.log(confirm);
    }
}


function changeMenu(menu){
    if (menu == "list-data"){
        todolist();
        $('#add-data').hide();
        $('#list-data').fadeIn();
        $('#edit-list').hide();
    }
    else if (menu == "add-data"){
        $('#add-data').fadeIn();
        $('#list-data').hide();
        $('#edit-list').hide();
    }else if (menu == "edit-list"){
        $('#edit-list').fadeIn();
        $('#add-data').hide();
        $('#list-data').hide();
    }
}