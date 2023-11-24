var usu_id = $('#usu_idx').val();

function init(){
    $("#socialMedia_form").on("submit",function(e){
        guardaryeditar(e);
    });
}

function guardaryeditar(e){

    e.preventDefault();
    var formData = new FormData($("#socialMedia_form")[0]);

    $.ajax({
        url: "/Portafolio/controller/social_media.php?opc=guardaryeditar",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,

        success: function(data){
            console.log(data);
            $('#socialMedia_data').DataTable().ajax.reload();
            $('#modalcrearRedes').modal('hide');

            Swal.fire({
                title: 'Correcto!',
                text: 'Se Registro Correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            })
        }
    })
}

$(document).ready(function(){

    $('#socialMedia_data').DataTable({
        "aProcessing": true,
        "aServerSide": true,
        dom: 'Bfrtip',
        buttons: [
            'excelHtml5',
            'csvHtml5',
        ],
        "ajax":{
            url:"/Portafolio/controller/social_media.php?opc=listar",
            type:"post"
        },

        "bDestroy": true,
        "responsive": true,
        "bInfo": true,
        "iDisplayLength": 15,
        "order": [[ 0, "desc" ]],
        "languaje": {
            "sProcessing":     "procesando...",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando registros del _STAR_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst":     "Primero",
                "sLast":      "Último",
                "sNext":      "Siguiente",
                "sPrevious":  "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            } 
        }
    })
});


function editar (socmed_id){
    $.post("/Portafolio/controller/sociall_media.php?opc=mostrar",{socmed_id:socmed_id}, function (data){
        data = JSON.parse(data);
        //console.log(data);
        $("#socmed_id").val(data.socmed_id);
        $("#socmed_icono").val(data.socmed_icono);
        $("#socmed_url").val(data.socmed_url);
  

    });
    $("#titulo_modal").html("Editar Red");
    $("#modalcrearRedes").modal("show");
}
