import { Component } from '@angular/core';
import LaunchProgramsDump from '../launchProgramsDump';

type LaunchProgramType = {
  mission_name: string,
  flight_number: number,
  launch_year: string,
  launch_success: boolean,
  mission_id: Array<string>,
  rocket: any,
  links: {mission_patch_small: string}
};

type FormattedLaunchProgramType = {
  missonname: string,
  flightnumber: number,
  launchyear: string,
  launchsuccess: boolean,
  missionids: string,
  imageurl: string,
  landsuccess: string
};


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'launch-programs',
  templateUrl: './launch-programs.component.html',
  styleUrls: ['./launch-programs.component.scss']
})
export class LaunchProgramsComponent {

  launchPrograms: Array<FormattedLaunchProgramType> = [];

  constructor() {
    this.launchPrograms = this.formatLaunchPrograms(LaunchProgramsDump || []);
    console.log(this.launchPrograms);
  }

  formatLaunchPrograms(launchPrograms: Array<LaunchProgramType>): Array<FormattedLaunchProgramType>  {
    const formattedLaunchPrograms = launchPrograms.map((launchProgram: LaunchProgramType) => {
        const { mission_name, flight_number, launch_year, launch_success, mission_id, rocket, links } = launchProgram;

        return {
            missonname: mission_name,
            flightnumber: flight_number,
            launchyear: launch_year,
            launchsuccess: launch_success,
            missionids: mission_id.join(','),
            imageurl: links.mission_patch_small,
            landsuccess: rocket.first_stage.cores[0].land_success
        };
    });
    return formattedLaunchPrograms;
  }

}
