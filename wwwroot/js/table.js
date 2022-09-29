$(document).ready(function () {
     let id=0;
     $('#example').DataTable({
            pagingType: 'full_numbers',         // first, previous, next and last buttons on the table
            responsive: true,  //makes the table responsive
            orderCellsTop: true,
            autoWidth: false,
            //the order of the table functionalities
            dom: "<'float-left pt-5' f>" + "<'float-right pt-5' l>" + "<'d-flex justify-content-center pr-5 pb-5 'p>" + "<t>" + 
                "<'float-left' i>" + "<'float-right mt-2' l>" + "<'d-flex justify-content-center mt-5 pl-5 'p>",               
            
            "ajax": {           //ajax api url to access database
                "url": "/bugs/getAll",
                "type": "GET",
                "datatype": "json"
            },
            "columns": [//columns width and additional column specific functionalities
                { "data": "id",
                        "render":function (data) {
                                id=data; //cashing the id value for later uses
                            return data;
                        },
                    "width":"3%" },
                { "data": "summary",
                    "render": function (data) {         //links on summary column
                        return `<a class="text-dark" href="/Bugs/DisplayBug?id=${id}">${data}</a>`;
                    },
                    "width":"30%" 
                },
                { "data": "type", "width":"20%" },
                { "data": "priority", "width":"12%" },
                { "data": "severity", "width":"11%" },
                { "data": "reproRate", "width":"8%" },
                { "data": "platform", "width":"11%" },
                { "data": "status", "width":"12%"},
                { "data": "closed", "width":"8%"},
            ],
            "width":"100%",
         
            initComplete: function () {     // selective search implementation on columns [2,End]
                this.api()
                    .columns()
                    .every(function () {
                        let column = this;
                        // column interval validation
                        let select =  $('<select><option value=""></option></select>')
                            .appendTo($("#example thead tr:eq(1) th").eq(column.index()).empty())
                            .on('change', function () {
                                let val = $.fn.dataTable.util.escapeRegex($(this).val());
                                //applying the search
                                column.search(val ? '^' + val + '$' : '', true, false).draw();
                            })
                        ;
                        //sorting the table according to the search
                        column
                            .data()
                            .unique()
                            .sort()
                            .each(function (d) {
                                select.append('<option value="' + d + '">' + d + '</option>');
                            });
                        
                    });
                
           },
    });
     
    
});
