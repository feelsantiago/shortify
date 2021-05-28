import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request } from 'express';

/**
 * This guard is a generic roles authenticate, when a controller has action with differs roles
 * Use with @Roles(...roles) decorator
 */
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    /**
     * This guard prioritize roles set for actions, if no, than use roles for controller
     * @param context
     */
    public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // get actions roles
        let roles = this.reflector.get<string[]>('roles', context.getHandler());

        // action don't has roles
        if (!roles) {
            // get roles for controller
            roles = this.reflector.get<string[]>('roles', context.getClass());

            // no roles based, authorize
            if (!roles) return true;
        }

        // search for a role match
        const request: Request = context.switchToHttp().getRequest();
        const { user } = request;

        const hasRole = (): boolean => roles.includes(user.role);

        return user && user.role && hasRole();
    }
}
