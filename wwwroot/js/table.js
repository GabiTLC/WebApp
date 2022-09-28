$(document).ready(function () {
     let id=0;
     $('#example').DataTable({
            pagingType: 'full_numbers',         // first, previous, next and last buttons on the table
            responsive: true,
            orderCellsTop: true,//makes the table responsive
            // columnDefs: [
            //     { orderable: true, targets: 2 },
            //     { orderable: true, targets: 3 },       //disables the ordering functionality on specific columns
            //     { orderable: true, targets: 4 },
            //     { orderable: true, targets: 5 }
            // ],
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
                    "width":"5%" },
                { "data": "summary",
                    "render": function (data) {         //links on summary column
                        return `<a class="text-dark" href="/Bugs/DisplayBug?id=${id}">${data}</a>`;
                    },
                    "width":"45%" 
                },
                { "data": "type", "width":"15%" },
                { "data": "priority", "width":"15%" },
                { "data": "severity", "width":"10%" },
                { "data": "platform", "width":"10%" },
            ],
            "width":"100%",
         
            initComplete: function () {     // selective search implementation on columns [2,End]
                this.api()
                    .columns([2,3,4,5])
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
