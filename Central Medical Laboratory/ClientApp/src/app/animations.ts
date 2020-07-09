import { trigger, transition, group, query, style, animate, animateChild } from '@angular/animations';

export const slideInAnimation =
  trigger('routeSlideAnimation', [
    transition(':increment', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        })
      ], { optional: true }),
      query(':enter', [
        style({ right: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ right: '100%' }))
        ], { optional: true }),
        query(':enter', [
          animate('500ms ease-out', style({ right: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ] ),
    transition(':decrement', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ], { optional: true }),
      query(':enter', [
        style({ left: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ left: '100%' }))
        ], { optional: true }),
        query(':enter', [
          animate('500ms ease-out', style({ left: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ] ),
  ]);
