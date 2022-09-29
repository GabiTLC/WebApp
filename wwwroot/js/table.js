$(document).ready(function () {
     let id=0;
     let table = $('#example').DataTable({
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
     Highcharts.setOptions({
        colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
            return {
                radialGradient: {
                    cx: 0.5,
                    cy: 0.3,
                    r: 0.7
                },
                stops: [
                    [0, color],
                    [1, Highcharts.color(color).brighten(-0.3).get('rgb')] // darken
                ]
            };
        })
     });

     var chart1 = Highcharts.chart('chart1', {
        chart: {
            type: 'pie',
            plotBackgroundColor: '#bb0404',
            plotBorderWidth: null,
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            },
        },
        title: {
            text: '<span style=""> Bug Count Per Type</span>',                //add style
        },
        tooltip: {
            headerFormat: '',
            pointFormat:'<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
                'No. of bugs: <b>{point.y}</b><br/>' +
                'Procentage of displayed bugs: <b>{point.percentage:.1f}%</b><br/>'
            },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 45,
                dataLabels: {
                    enabled: true,
                    connectorColor: 'silver',
                    format: '<b>{point.name}</b>'
                }
            }
        },
        series: [
            {
                name: 'Bugs',
                data: chartData(table,2),
                showInLegend: true,
            },
        ],
    });

     var chart2 = Highcharts.chart('chart2', {
        chart: {
            type: 'pie',
            plotBackgroundColor: '#bb0404',
            plotBorderWidth: null,
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            },
        },
        title: {
            text: 'Bug Count Per Status',
        },
        tooltip: {
            headerFormat: '',
            pointFormat:'<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
                'No. of bugs: <b>{point.y}</b><br/>' +
                'Procentage of displayed bugs: <b>{point.percentage:.1f}%</b><br/>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 45,
                dataLabels: {
                    enabled: true,
                    connectorColor: 'silver',
                    format: '<b>{point.name}</b>'
                }
            }
        },
        series: [
            {
                name: 'Bugs',
                data: chartData(table,7),
                showInLegend: true,
            },
        ],
    });
    // On each draw, update the data in the chart
    
     table.on('draw', function () {
        chart1.series[0].setData(chartData(table,2));
        chart2.series[0].setData(chartData(table,7));
    });
    
});
function chartData(table,column) {
    var counts = {};

    // Count the number of entries for each position
    table
        .column(column, { search: 'applied' })
        .data()
        .each(function (val) {
            if (counts[val]) {
                counts[val] += 1;
            } else {
                counts[val] = 1;
            }
        });

    // And map it to the format highcharts uses
    return $.map(counts, function (val, key) {
        return {
            name: key,
            y: val,
        };
    });
}
