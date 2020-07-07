import { trigger, transition, group, query, style, animate, animateChild } from '@angular/animations';

export const slideInAnimation =
  trigger('routeSlideAnimation', [
    transition(':increment', slideTo('right') ),
    transition(':decrement', slideTo('left') ),
  ]);

function slideTo(direction) {
  const optional = { optional: true };
  return [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        [direction]: 0,
        width: '100%'
      })
    ], optional),
    query(':enter', [
      style({ [direction]: '-100%'})
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('500ms ease-out', style({ [direction]: '100%'}))
      ], optional),
      query(':enter', [
        animate('500ms ease-out', style({ [direction]: '0%'}))
      ])
    ]),
    query(':enter', animateChild()),
  ];
}