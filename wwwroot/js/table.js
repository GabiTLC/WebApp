$(document).ready(function () {
     let id=0;
     let table = $('#example').DataTable({
            // first, previous, next and last buttons on the table
            pagingType: 'full_numbers',
            //makes the table responsive
            responsive: true,
            orderCellsTop: true,
            autoWidth: false,
         
            //ordering priority settings
            "columnDefs": [
            {
                 "sType": 'priority-grade',
                 targets: 3
            },
            {
                 "sType": 'severity-grade',
                 targets: 4
            }, 
            {
                 "sType": 'repro-grade',
                 targets: 5
            }, 
            {
                "sType": 'platform-grade',
                targets: 6
            },
            {
                "sType": 'status-grade',
                targets: 7
            },
            ],
            
            //the order of the table functionalities
            dom: "<'float-left pt-5' f>" + "<'float-right pt-5' l>" + "<'d-flex justify-content-center pr-5 pb-5 'p>" + "<t>" + 
                "<'float-left' i>" + "<'float-right mt-2' l>" + "<'d-flex justify-content-center mt-5 pl-5 'p>",
            
            //ajax api url to access database
            "ajax": {
                "url": "/bugs/getAll",
                "type": "GET",
                "datatype": "json"
            },
            
            //columns width and additional column specific functionalities
            "columns": [
                { "data": "id",
                    //cashing the id value for later uses
                        "render":function (data) {
                                id=data; 
                            return data;
                        },
                    "width":"3%" },
                { "data": "summary",
                    //links on summary column
                    "render": function (data) {         
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
                { "data": "state", "width":"8%"},
            ],
            "width":"100%",
            
            // selective search implementation on columns [2,End]
            initComplete: function () {     
                this.api()
                    .columns()
                    .every(function () {
                        let column = this;
                        // column interval validation
                        let select =  $('<select><option value=""></option></select>')
                            .appendTo($("#example thead tr:eq(1) th").eq(column.index()).empty()) //append only in lower tablehead
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
            
            rowCallback: function ( row, data ) {
                // Set the checked state of the checkbox in the table
                return $('input.active-edit', row).prop( 'checked', data.close === "true" );
            },
     
     });
     //sort order by custom rules
    $.fn.dataTable.ext.type.order['priority-grade-pre'] = function (d) {
        switch (d) {
            case 'Very High':
                return 1;
            case 'High':
                return 2;
            case 'Medium':
                return 3;
            case 'Low':
                return 4;
            case 'Very Low':
                return 5;
        }
        return 0;
    };
    $.fn.dataTable.ext.type.order['severity-grade-pre'] = function (d) {
        switch (d) {
            case 'Blocker':
                return 1;
            case 'Critical':
                return 2;
            case 'Major':
                return 3;
            case 'Minor':
                return 4;
            case 'Trivial':
                return 5;
        }
        return 0;
    };
    $.fn.dataTable.ext.type.order['repro-grade-pre'] = function (d) {
        switch (d) {
            case '100%':
                return 1;
            case '80%':
                return 2;
            case '60%':
                return 3;
            case '40%':
                return 4;
            case '20%':
                return 5;
            case '1%':
                return 6;
        }
        return 0;
    };
    $.fn.dataTable.ext.type.order['platform-grade-pre'] = function (d) {
        switch (d) {
            case 'All':
                return 1;
            case 'PC':
                return 2;
            case 'XB':
                return 3;
            case 'PS':
                return 4;
            case 'AnDr':
                return 5;
            case 'iOS':
                return 6;
            case 'WGB':
                return 7;
            case 'NTD':
                return 8;
        }
        return 0;
    };
    $.fn.dataTable.ext.type.order['status-grade-pre'] = function (d) {
        switch (d) {
            case 'Open':
                return 1;
            case 'Reopen':
                return 2;
            case 'Regress':
                return 3;
            case 'Fixed':
                return 4;
            case 'Duplicate':
                return 5;
            case 'Not A Bug':
                return 6;
        }
        return 0;
    };
    
     //color tint on pie chart
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
    
     //first chart settings
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

     //second chat settings
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

//pie chart custom function
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
