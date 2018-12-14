export interface CapabilityDefinition {
  module: string;
  props: { [propId: string]: string; };
  extra: { [propId: string]: string; };
}

export interface EnumInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  metadata: {
    language: string;
  }
}

export interface ExtraInfo {
  image: string;
  route: string;
  service: string;
  enumInfo: EnumInfo;
}

export interface Part {
  subFolderName?: string;
  shared: {
    runtime?: {
      name: string;
    },
    maven?: {
      groupId?: string;
      artifactId?: string;
      version?: string;
    },
  },
  extra: {
    category: 'backend' | 'frontend' | 'support';
    runtimeInfo?: ExtraInfo;
  };
  capabilities: CapabilityDefinition[];
}

export interface AppDefinition {
  application: string;
  parts: Part[];
}

export function adaptAppDefinition(data: any): AppDefinition {
  const adapted = { 
    ...data, 
    parts: data.parts.map(p => ({
       ...p, 
       extra: { ...p.extra }
      }))
      .filter(p => p.extra.category !== 'support' )
  };
  return adapted as AppDefinition;
}