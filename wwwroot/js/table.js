$(document).ready(function () {
    // Setup - add a text input to each footer cell
    $(document).ready(function () {
        $('#example').DataTable({
            pagingType: 'full_numbers',
            responsive: true,
            columnDefs: [
                { orderable: false, targets: 2 },
                { orderable: false, targets: 3 },
                { orderable: false, targets: 4 },
                { orderable: false, targets: 5 }
            ],
            dom: "<'float-left pt-5' f>" + "<'float-right pt-5' l>" + "<'d-flex justify-content-center pr-5 pb-5 'p>" + "<t>" + 
                "<'float-left' i>" + "<'float-right mt-2' l>" + "<'d-flex justify-content-center mt-5 pl-5 'p>",               
            "ajax": {
                "url": "/bugs/getall/",
                "type": "GET",
                "datatype": "json"
            },
            "columns": [
                { "data": "id", "width":"5%" },
                { "data": "summary", "width":"45%" },
                { "data": "type", "width":"15%" },
                { "data": "priority", "width":"15%" },
                { "data": "severity", "width":"10%" },
                { "data": "platform", "width":"10%" },
            ],
            "width":"100%",
            initComplete: function () {
                var i=0;
                this.api()
                    .columns()
                    .every(function () {
                        var column = this;
                        var select = i===0 || i===1 ? $('<select style="opacity: 0; pointer-events: none"><option value=""></option></select>')
                            .appendTo($(column.header()).empty())
                            .on('change', function () {
                                var val = $.fn.dataTable.util.escapeRegex($(this).val());

                                column.search(val ? '^' + val + '$' : '', true, false).draw();
                            }) : $('<select><option value=""></option></select>')
                            .appendTo($(column.header()).empty())
                            .on('change', function () {
                                var val = $.fn.dataTable.util.escapeRegex($(this).val());

                                column.search(val ? '^' + val + '$' : '', true, false).draw();
                            });

                        column
                            .data()
                            .unique()
                            .sort()
                            .each(function (d, j) {
                                select.append('<option value="' + d + '">' + d + '</option>');
                            });
                        i++;
                    });
            },
        });
    });
});