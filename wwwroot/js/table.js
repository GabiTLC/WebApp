$(document).ready(function () {
    // Setup - add a text input to each footer cell
    $(document).ready(function () {
        $('#example').DataTable({
            pagingType: 'full_numbers',         // first, previous, next and last buttons on the table
            responsive: true,       //makes the table responsive
            columnDefs: [
                { orderable: false, targets: 2 },
                { orderable: false, targets: 3 },       //disables the ordering functionality on specific columns
                { orderable: false, targets: 4 },
                { orderable: false, targets: 5 }
            ],
            //the order of the table functionalities
            dom: "<'float-left pt-5' f>" + "<'float-right pt-5' l>" + "<'d-flex justify-content-center pr-5 pb-5 'p>" + "<t>" + 
                "<'float-left' i>" + "<'float-right mt-2' l>" + "<'d-flex justify-content-center mt-5 pl-5 'p>",               
            
            "ajax": {           //ajax api url to access database
                "url": "/bugs/getall/",
                "type": "GET",
                "datatype": "json"
            },
            "columns": [            //columns width and additional column specific functionalities
                { "data": "id", "width":"5%" },
                { "data": "summary",
                    "render": function (data) {         //links on summary column
                        //add dynamic link to specific bug page
                        let link = "https://youtube.com";
                        return '<a class="text-dark" href="' +link+' ">'+data+'</a>';
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
                let i=0;
                this.api()
                    .columns()
                    .every(function () {
                        let column = this;
                        // column interval validation
                        let select = i===0 || i===1 
                            ? $('<select style="opacity: 0; pointer-events: none"><option value=""></option></select>')
                            .appendTo($(column.header()).empty())
                            .on('change', function () {
                                let val = $.fn.dataTable.util.escapeRegex($(this).val());
                                //applying the search
                                column.search(val ? '^' + val + '$' : '', true, false).draw();
                            })
                            : $('<select><option value=""></option></select>')
                            .appendTo($(column.header()).empty())
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
                        i++;
                    });
            },
        });
    });
});