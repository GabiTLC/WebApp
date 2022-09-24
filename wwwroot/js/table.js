$(document).ready(function () {
    // Setup - add a text input to each footer cell
    $(document).ready(function () {
        $('#example').DataTable({
            pagingType: 'full_numbers',
            responsive: true,
            dom: "<'float-left pt-5' f>" + "<'float-right pt-5' l>" + "<'d-flex justify-content-center pr-5 pb-5 'p>" + "<t>" + 
                "<'float-left' i>" + "<'float-right mt-2' l>" + "<'d-flex justify-content-center mt-5 pl-5 'p>",               
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