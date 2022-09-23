$(document).ready(function () {
    // Setup - add a text input to each footer cell
    $(document).ready(function () {
        $('#example').DataTable({
            dom: "<'position-relative'<'position-absolute pb-5 top-0 start-0'f>>",
                
            initComplete: function () {
                var i=0;
                this.api()
                    .columns()
                    .every(function () {
                        var column = this;
                        var select = i===0 ? $('<select style="opacity: 0; pointer-events: none"><option value=""></option></select>')
                            .appendTo($(column.footer()).empty())
                            .on('change', function () {
                                var val = $.fn.dataTable.util.escapeRegex($(this).val());

                                column.search(val ? '^' + val + '$' : '', true, false).draw();
                            }) : $('<select><option value=""></option></select>')
                            .appendTo($(column.footer()).empty())
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