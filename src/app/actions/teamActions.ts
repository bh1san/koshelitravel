
'use server';

import { revalidatePath } from 'next/cache';
import type { TeamMember } from '@/lib/mock-data';
import { readTeamMembers, writeTeamMembers } from '@/lib/team-store';

export async function addTeamMember(member: TeamMember): Promise<{ success: boolean; message: string }> {
    try {
        const members = await readTeamMembers();
        members.push(member);
        await writeTeamMembers(members);

        revalidatePath('/about');
        revalidatePath('/admin/team');

        return { success: true, message: 'Team member added successfully.' };
    } catch (error) {
        console.error('Failed to add team member:', error);
        return { success: false, message: 'Failed to add team member.' };
    }
}

export async function updateTeamMember(updatedMember: TeamMember): Promise<{ success: boolean; message: string }> {
    try {
        const members = await readTeamMembers();
        const memberIndex = members.findIndex(m => m.id === updatedMember.id);

        if (memberIndex === -1) {
            return { success: false, message: 'Team member not found.' };
        }

        members[memberIndex] = updatedMember;
        await writeTeamMembers(members);

        revalidatePath('/about');
        revalidatePath('/admin/team');

        return { success: true, message: 'Team member updated successfully.' };
    } catch (error) {
        console.error('Failed to update team member:', error);
        return { success: false, message: 'Failed to update team member.' };
    }
}

export async function deleteTeamMember(memberId: string): Promise<{ success: boolean; message: string }> {
    try {
        const members = await readTeamMembers();
        const updatedMembers = members.filter(m => m.id !== memberId);

        if (members.length === updatedMembers.length) {
             return { success: false, message: 'Team member not found.' };
        }
        
        await writeTeamMembers(updatedMembers);

        revalidatePath('/about');
        revalidatePath('/admin/team');

        return { success: true, message: 'Team member deleted successfully.' };
    } catch (error) {
        console.error('Failed to delete team member:', error);
        return { success: false, message: 'Failed to delete team member.' };
    }
}
