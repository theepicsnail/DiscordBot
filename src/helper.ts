/// <reference path="../node_modules/@ryancavanaugh/lokijs/lokijs.d.ts" />
import * as Loki from 'lokijs';
import * as Config from './config';
import * as path from 'path';

class Helper {
	public getDB(name: string):Loki {
		const file = path.join(Config.dbPath, name + ".json");
		console.log("DB", file);
		return new Loki(file, {
			autosave:true,
			autosaveInterval: 1000 * 1,
			autoload:true,
			autoloadCallback:() => {
				console.log(`DB ${name} loaded.`);
			},
			autosaveCallback:()=>{
				console.log(`DB ${name} saved.`);
			}
		});
	}
}

export default new Helper();