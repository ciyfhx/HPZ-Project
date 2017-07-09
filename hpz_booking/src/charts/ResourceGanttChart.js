/*global gantt*/
import React, {
	Component
} from 'react';
import 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

export default class ResourceGanttChart extends Component {

	componentDidMount() {
		gantt.config.grid_width = 380;

		gantt.config.readonly = true;
    gantt.config.xml_date = "%d-%m-%Y %H:%i";
    gantt.config.scale_unit = "hour";
    gantt.config.step = 1;
    gantt.config.date_scale = "%g %a";
    gantt.config.min_column_width = 20;
    gantt.config.duration_unit = "minute";
    gantt.config.duration_step = 60;
    gantt.config.scale_height = 75;

    gantt.config.subscales = [
      {
        unit: "day",
        step: 1,
        date: "%j %F, %l"
      }, {
        unit: "minute",
        step: 15,
        date: "%i"
      }
    ];


		gantt.config.columns = [
			{
				name: "id",
				label: "Resource Name",
				tree: false,
				width: '*'
			}
		];
		gantt.init(this.ganttContainer);
		console.log(this.props)
		//gantt.parse(this.props.bookings)
	}

	render() {
		return (
			<div ref= { (input) => { this.ganttContainer = input } } style={{
				width: '100%',
				height: '400px'
			}}></div>
		);
	}
}

export function formatDate(date){
	return gantt.date.date_to_str("%d %m %Y %H:%i")(date);
}

export function parse(resources){
	console.log(resources)
	gantt.parse(resources);
}
