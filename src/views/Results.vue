<template>
    <h2>Results</h2>
    <p>These are you results. You {{scorePercentage >= 60 ? 'passed' : 'failed'}} the test with a {{scorePercentage}}% score.</p>

    <router-link class="btn btn-info text-light text-decoration-none" to="/">Try Again!</router-link>
    
    <div class="row">
        <div class="col-12 col-lg-6">
            <h3>Personal Score</h3>
            <div class="chart" ref="chartdiv" id="piechart"></div>
        </div>
        <div class="col-12 col-lg-6">
            <h3>Global Score</h3>
            <div class="chart" ref="columndiv" id="columnchart"></div>
        </div>
    </div>
</template>
<script>
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { useStore } from '../store';

export default {
    name: 'Result',
    data() {
        return {
            mainStore: useStore()
        }
    },
    computed: {
        scorePercentage() {
            return (this.mainStore.score / this.mainStore.userAnswers.length) * 100
        }
    },
    methods: {
        createColumnChart() {
            let root = am5.Root.new(this.$refs.columndiv);

            root.setThemes([am5themes_Animated.new(root)]);

            let chart = root.container.children.push(
                am5xy.XYChart.new(root, {
                    panY: false,
                    layout: root.verticalLayout
                })
            );
            // Define data
            let data = [...this.mainStore.mockData];

            // Create Y-axis
            let yAxis = chart.yAxes.push(
                am5xy.ValueAxis.new(root, {
                    renderer: am5xy.AxisRendererY.new(root, {})
                })
            );

            // Create X-Axis
            let xAxis = chart.xAxes.push(
                am5xy.CategoryAxis.new(root, {
                    renderer: am5xy.AxisRendererX.new(root, {}),
                    categoryField: "name"
                })
            );
            xAxis.data.setAll(data);

            // Create series
            let series1 = chart.series.push(
                am5xy.ColumnSeries.new(root, {
                    name: "Correct",
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: "correct",
                    categoryXField: "name"
                })
            );
            series1.data.setAll(data);

            let series2 = chart.series.push(
                am5xy.ColumnSeries.new(root, {
                    name: "Wrong",
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: "wrong",
                    categoryXField: "name"
                })
            );
            series2.data.setAll(data);

            // Add legend
            let legend = chart.children.push(am5.Legend.new(root, {}));
            legend.data.setAll(chart.series.values);

            // Add cursor
            chart.set("cursor", am5xy.XYCursor.new(root, {}));

            this.root = root;
        },
        createPieChart() {
            let rootPie = am5.Root.new(this.$refs.chartdiv);

            rootPie.setThemes([am5themes_Animated.new(rootPie)]);

            let chart = rootPie.container.children.push(
                am5percent.PieChart.new(rootPie, {})
            );

            let series = chart.series.push(
                am5percent.PieSeries.new(rootPie, {
                    name: "Series",
                    categoryField: "status",
                    valueField: "score"
                })
            );

            const userData = [
                { 
                    status: "Correct",
                    score: this.mainStore.score
                },
                { 
                    status: "Wrong",
                    score: this.mainStore.userAnswers.filter(elem => !elem.isCorrect).length
                }
            ]

            series.data.setAll(userData);

            this.rootPie = rootPie;
        }
    },
    mounted() {
        this.createColumnChart();
        this.createPieChart();
    },
    beforeUnmount() {
        this.mainStore.$reset();
        if (this.rootPie) {
            this.rootPie.dispose();
        }
        if (this.root) {
            this.root.dispose();
        }
    }
}
</script>
<style lang="scss">
.chart {
    width: 100%;
    height: 500px;
}
</style>