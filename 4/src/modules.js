import {LoaderModule} from 'whs/modules/LoaderModule';

export const processor = new WHS.PostProcessorModule();
export const assetsLoader = new LoaderModule();
export const soundLoader = new LoaderModule();
soundLoader.expect('sound');

export default {
  processor
};
