import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const root=new URL('../',import.meta.url);
const read=p=>readFileSync(new URL(p,root),'utf8');
test('Shuku metadata preserves identity and actual static entry',()=>{
 const data=JSON.parse(read('shuku.json'));
 assert.equal(data.course_id,"course-0780d626-b2c");
 assert.equal(data.repository,"https://github.com/reduct-shuku/intuitive-neural-network11");
 assert.equal(data.name,"intuitive-neural-network11");
 assert.equal(data.schema_version,1);assert.equal(data.type,'official');assert.equal(data.build_profile,'static');
 assert.match(data.version,/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/);
 assert.ok(typeof data.entry==='string'&&!/[\\?#%:]/.test(data.entry)&&data.entry.split('/').every(p=>p&&p!=='.'&&p!=='..'));
 const path=data.path??'.';assert.ok(path==='.'||(typeof path==='string'&&!/[\\?#%:]/.test(path)&&path.split('/').every(p=>p&&p!=='.'&&p!=='..')));
 assert.ok(data.entry.endsWith('.html'));assert.ok(existsSync(new URL((path==='.'?'':path+'/')+data.entry,root)));
 for(const name of ['README.md','SKILL.md','CONTRIBUTING.md'])assert.ok(read(name).trim());
 assert.ok(read('SKILL.md').includes('name: '+data.name));assert.ok(!existsSync(new URL('course.yaml',root)));assert.ok(!existsSync(new URL('.template',root)));
});
