import test from 'node:test';
import assert from 'node:assert/strict';
import { shouldPlayMiraklTransition } from '../src/lib/miraklTransition.ts';

const normal = {desktop:true,seen:false,button:0,modified:false,defaultPrevented:false};
test('first ordinary desktop activation plays the transition', () => assert.equal(shouldPlayMiraklTransition(normal),true));
for (const [name, patch] of Object.entries({
  'mobile, touch or reduced motion': {desktop:false},
  'already seen in this session': {seen:true},
  'middle mouse click': {button:1},
  'modifier key / new tab': {modified:true},
  'previously handled activation': {defaultPrevented:true},
})) test(name,()=>assert.equal(shouldPlayMiraklTransition({...normal,...patch}),false));
