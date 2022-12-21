import {TimelineChart} from "timeline-chart/lib/time-graph-model";


export class TraceDataProvider {
    protected totalLength: bigint;
    protected traceData: any;

    constructor () {
        this.totalLength = BigInt(500000);
        this.traceData = require('../public/trace.json')
    }

    setData(traceData: any): void {
        this.traceData = traceData;
    }

    getRowIds(): number[] {
        const rowIds: number[] = [];
        this.traceData.rows.forEach((row: any, rowIndex: number) => {
            rowIds.push(rowIndex)
        })
        return rowIds;
    }

    getData(opts: { range?: TimelineChart.TimeGraphRange, resolution?: number }): TimelineChart.TimeGraphModel {
        const rows: TimelineChart.TimeGraphRowModel[] = [];
        this.traceData.rows.forEach((rowData: any, rowIndex: number) => {
            const states: TimelineChart.TimeGraphState[] = [];
            rowData.time.forEach((state: number[], stateIndex: number) => {
                states.push({
                    id: 'id' + stateIndex.toString(),
                    label: rowData.name,
                    range: { start: BigInt(state[0]), end: BigInt(state[1]) },
                    data: { value: 0, style: {}}
                });
            })

            rows.push({
                id: rowIndex,
                name: 'row' + rowIndex.toString(),
                range: {
                    start: BigInt(0),
                    end: BigInt(5000)
                },
                states,
                annotations: [],
                data: {},
                prevPossibleState: BigInt(0),
                nextPossibleState: BigInt(2)
            });
        })
        const rangeEvents: TimelineChart.TimeGraphAnnotation[] = [];
        let arrows: TimelineChart.TimeGraphArrow[] = [];

        return {
            id: "",
            arrows,
            rows,
            rangeEvents,
            totalLength: this.totalLength
        };
    }
}