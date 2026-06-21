import { designingDataIntensiveApplications } from './designing-data-intensive-applications';
import { thePragmaticProgrammer } from './the-pragmatic-programmer';
import { theArtOfSeduction } from './the-art-of-seduction';
import { atomicHabits } from './atomic-habits';
import { dontMakeMeThink } from './dont-make-me-think';
import { zeroToOne } from './zero-to-one';
import { richDadPoorDad } from './rich-dad-poor-dad';
import { aLittleLife } from './a-little-life';
import { dopamineDetox } from './dopamine-detox';
import { the7HabitsOfHighlyEffectivePeople } from './the-7-habits-of-highly-effective-people';
import { cantHurtMe } from './cant-hurt-me';
import { openToWork } from './open-to-work';
import { theSubtleArt } from './the-subtle-art';

export const bookThoughtsData = {
  'designing-data-intensive-applications': designingDataIntensiveApplications,
  'the-pragmatic-programmer': thePragmaticProgrammer,
  'the-art-of-seduction': theArtOfSeduction,
  'atomic-habits': atomicHabits,
  'dont-make-me-think': dontMakeMeThink,
  'zero-to-one': zeroToOne,
  'rich-dad-poor-dad': richDadPoorDad,
  'a-little-life': aLittleLife,
  'dopamine-detox': dopamineDetox,
  'the-7-habits-of-highly-effective-people': the7HabitsOfHighlyEffectivePeople,
  'cant-hurt-me': cantHurtMe,
  'open-to-work': openToWork,
  'the-subtle-art-of-not-giving-a-fck': theSubtleArt,
};

export type BookThoughtKey = keyof typeof bookThoughtsData;
export type BookThought = typeof bookThoughtsData[BookThoughtKey];
