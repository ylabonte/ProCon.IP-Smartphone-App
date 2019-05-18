export interface IScaleParams {
    min: number;
    max: number;
    radius: number;
    majorTicks: number;
    minorTicks: number;
    labels: number;
    sweepAngle: number;
    startAngle: number;
    barIndicators: Array<{
        min: number;
        max: number;
        color: string;
        location: number;
    }>;
}

export class ScaleParams implements IScaleParams {
    min = 0;
    max = 100;
    radius = 0.9;
    majorTicks = 11;
    minorTicks = 9;
    labels = 6;
    sweepAngle = 270;
    barIndicators = new Array<{
        min: number;
        max: number;
        color: string;
        location: number;
    }>();

    get startAngle(): number {
        return 90 + ((360 - this.sweepAngle) / 2);
    }

    constructor(
        min?: number,
        max?: number,
        majorTicks?: number,
        minorTicks?: number,
        labels?: number,
        radius?: number,
        sweepAngle?: number,
        barIndicators?: Array<{
            min: number;
            max: number;
            color: string;
            location: number;
        }>
    ) {
        this.min = min ? min : this.min;
        this.max = max ? max : this.max;
        this.majorTicks = majorTicks ? majorTicks : this.majorTicks;
        this.minorTicks = minorTicks ? minorTicks : this.minorTicks;
        this.labels = labels ? labels : this.labels;
        this.radius = radius !== undefined ? radius : this.radius;
        this.sweepAngle = sweepAngle !== undefined ? sweepAngle : this.sweepAngle;
        this.barIndicators = barIndicators !== undefined ? barIndicators : this.barIndicators;
    }
}
