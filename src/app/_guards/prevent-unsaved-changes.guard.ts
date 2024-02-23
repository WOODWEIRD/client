import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = (component) => {
  if (component.ngform.dirty) {
    return confirm('sure u want to continue, any unsaved will be lost');
  }

  return true;

};
