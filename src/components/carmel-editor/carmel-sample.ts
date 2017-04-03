export interface IComponentTag {
  id: number;
  cTag: string;
}

export interface ISampleTag {
  id: number;
  tag: string;
}

export interface ISampleDefinition {
  id: number;
  name: string;
  created: Date;
  gist: string;
  sampleTags: ISampleTag[];
}

export interface ICarmelSample {
  name: string;
  created: Date;
  componentTags: IComponentTag[];
  samples: ISampleDefinition[];
}
