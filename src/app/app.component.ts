import { Component, OnInit } from '@angular/core';
import { DataModel } from './data.model';

export type ChartOptions = {
  series: any;
  chart: any;
  xaxis: any;
  yaxis: any;
  tooltip: any;
  colors: string[];
  plotOptions: any;
  legend: any;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public chartOptions: ChartOptions = {
    series: [],
    chart: {},
    xaxis: {},
    yaxis: {},
    tooltip: {},
    colors: [],
    plotOptions: {},
    legend: {} // Add legend property
  };

  public data: DataModel[] = [
    { hemisphere: 'NH', region: 'MEA', country: 'Afghanistan', date1: new Date('2023-04-16'), date2: new Date('2025-04-28'), date3: new Date('2026-02-22') },
    { hemisphere: 'SH', region: 'MEA', country: 'Aland Islands', date1: new Date('2023-04-27'), date2: new Date('2025-05-21'), date3: new Date('2026-03-17') },
    { hemisphere: 'NH', region: 'MEA', country: 'Algeria', date1: new Date('2023-05-05'), date2: new Date('2025-05-24'), date3: new Date('2026-03-20') },
    { hemisphere: 'SH', region: 'APAC', country: 'Azerbaijan', date1: new Date('2023-05-21'), date2: new Date('2025-06-07'), date3: new Date('2026-04-03') },
    { hemisphere: 'NH', region: 'APAC', country: 'Bahrain', date1: new Date('2023-04-16'), date2: new Date('2025-06-02'), date3: new Date('2026-03-29') },
    { hemisphere: 'NH', region: 'APAC', country: 'Belgium', date1: new Date('2023-07-30'), date2: new Date('2025-05-21'), date3: new Date('2026-03-17') },
    { hemisphere: 'SH', region: 'WEU', country: 'Cape Verde', date1: new Date('2023-04-16'), date2: new Date('2025-08-09'), date3: new Date('2026-06-05') },
    { hemisphere: 'NH', region: 'WEU', country: 'Denmark', date1: new Date('2022-12-12'), date2: new Date('2025-05-21'), date3: new Date('2026-03-17') },
    { hemisphere: 'TROPICAL', region: 'NA', country: 'Egypt', date1: new Date('2022-11-11'), date2: new Date('2025-11-11'), date3: new Date('2026-09-07') },
    { hemisphere: 'TROPICAL', region: 'NA', country: 'Finland', date1: new Date('2022-11-11'), date2: new Date('2025-11-11'), date3: new Date('2026-09-07') }
  ];

  public filteredData: DataModel[] = [...this.data];
  public selectedHemisphere: string = '';
  public selectedCountry: string = '';

  ngOnInit() {
    this.updateChartOptions();
  }

  updateChartOptions() {
    this.chartOptions = {
      series: [
        {
          name: "Date 1 to Date 2",
          data: this.filteredData.map(d => ({
            x: d.country,
            y: [d.date1.getTime(), d.date2.getTime()]
          }))
        },
        {
          name: "Date 2 to Date 3",
          data: this.filteredData.map(d => ({
            x: d.country,
            y: [d.date2.getTime(), d.date3.getTime()]
          }))
        }
      ],
      chart: {
        type: "rangeBar",
        height: 450
        
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "80%",
        },
      },
      colors: ['#008FFB', '#00E396'],
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        // labels: {
         
        //   formatter: (val: any, opts: any) => {
        //     if (opts && typeof opts.dataPointIndex !== 'undefined' && this.filteredData[opts.dataPointIndex]) {
        //       const country = this.filteredData[opts.dataPointIndex].country;
        //       const region = this.filteredData[opts.dataPointIndex].region;
        //       return `${country} (${region})`;
        //     }
        //     return '';
        //   },
        //   maxWidth: 500
        // }
      },
      tooltip: {
        
        custom: (series:any)=> {
          console.log(series.dataPointIndex)
          console.log(this.filteredData[series.dataPointIndex].country)
          const start = new Date(this.filteredData[series.dataPointIndex].date1);
            const end = new Date(this.filteredData[series.dataPointIndex].date2);
            const startDate = `${start.getDate()}-${start.toLocaleString('default', { month: 'short' })}-${start.getFullYear()}`;
            const endDate = `${end.getDate()}-${end.toLocaleString('default', { month: 'short' })}-${end.getFullYear()}`;
            
          // return "fjh"
          return `<div class="arrow_box" style="padding:5px;">
            <span style="font-weight:bold;color:grey;">${this.filteredData[series.dataPointIndex].country}: </span>
            <span>${startDate} to ${endDate}</span>
            </div>`
        }
        // x: {
        //   format: "dd MMM yyyy"
        // },
        // y: {
        //   formatter: (val: number[], opts: any) => {
        //     console.log("hey"+val[0])
        //     console.log("oop"+opts)

        //     const start = new Date(val[0]);
        //     const end = new Date(val[1]);
        //     const startDate = `${start.getDate()}-${start.toLocaleString('default', { month: 'short' })}-${start.getFullYear()}`;
        //     const endDate = `${end.getDate()}-${end.toLocaleString('default', { month: 'short' })}-${end.getFullYear()}`;
        //     return `${startDate} to ${endDate}`;
        //   }
        // }
      },
      legend: {
        labels: {
          colors: ['#008FFB', '#00E396'],
          useSeriesColors: true
        },
        formatter: (seriesName: string, opts: any) => {
          if (opts && opts.w && opts.w.globals && typeof opts.seriesIndex !== 'undefined') {
            const series = opts.w.globals.series[opts.seriesIndex];
            if (series.length > 0) {
              const startDate = new Date(series[0][0]);
              const endDate = new Date(series[0][1]);
              const startFormatted = `${startDate.getDate()}-${startDate.toLocaleString('default', { month: 'short' })}-${startDate.getFullYear()}`;
              const endFormatted = `${endDate.getDate()}-${endDate.toLocaleString('default', { month: 'short' })}-${endDate.getFullYear()}`;
              return `${startFormatted} to ${endFormatted}`;
            }
          }
          return seriesName;
        }
      }
    };
  }

  filterData() {
    this.filteredData = this.data.filter(d =>
      (this.selectedHemisphere ? d.hemisphere === this.selectedHemisphere : true) &&
      (this.selectedCountry ? d.country === this.selectedCountry : true)
    );
    this.updateChartOptions();
  }
}
