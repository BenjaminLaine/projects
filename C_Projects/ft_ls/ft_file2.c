/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_file2.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/03/25 00:37:50 by blaine            #+#    #+#             */
/*   Updated: 2020/06/16 23:14:00 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_ls.h"

void	ft_get_user(t_file **file)
{
	struct passwd	*u;
	struct group	*g;

	if ((*file)->data->perm[0] == 'l')
		ft_get_link(file);
	else
		(*file)->data->link_name = NULL;
	if (!(u = getpwuid((*file)->data->stats.st_uid)))
		(*file)->data->user = ft_itoa((int)(*file)->data->stats.st_uid);
	else
		(*file)->data->user = ft_strdup(u->pw_name);
	if (!((*file)->data->user))
		ft_printf("%s\n", strerror(errno));
	if (!(g = getgrgid((*file)->data->stats.st_gid)))
		(*file)->data->group = ft_itoa((int)(*file)->data->stats.st_gid);
	else
		(*file)->data->group = ft_strdup(g->gr_name);
	if (!((*file)->data->group))
		ft_printf("%s\n", strerror(errno));
}

void	ft_get_link(t_file **file)
{
	char	buf[1024];
	int		i;

	i = -1;
	while (++i < 1024)
		buf[i] = 0;
	readlink((*file)->data->path, buf, 1024);
	(*file)->data->link_name = ft_strdup(buf);
	if (!((*file)->data->link_name))
		ft_printf("%s\n", strerror(errno));
}

void	ft_get_date(t_file **file)
{
	time_t	begin_sec;
	char	*full_date;
	char	*d1;
	char	*d2;

	full_date = ctime(&(*file)->data->stats.st_mtime);
	d1 = ft_strsub(full_date, 4, 7);
	begin_sec = time(&begin_sec);
	if ((*file)->data->stats.st_mtime < (begin_sec - 15778476)
		|| (*file)->data->stats.st_mtime > (begin_sec + 15778476))
		d2 = ft_strsub(full_date, 19, 5);
	else
		d2 = ft_strsub(full_date, 11, 5);
	if (!((*file)->data->mtime = ft_strjoin(d1, d2)))
		ft_printf("%s\n", strerror(errno));
	free(d1);
	free(d2);
}

void	ft_file_type(t_file **filep)
{
	t_file *file;

	file = *filep;
	if (S_ISDIR(file->data->stats.st_mode))
		file->data->perm[0] = 'd';
	else if (S_ISLNK(file->data->stats.st_mode))
		file->data->perm[0] = 'l';
	else if (S_ISBLK(file->data->stats.st_mode))
		file->data->perm[0] = 'b';
	else if (S_ISSOCK(file->data->stats.st_mode))
		file->data->perm[0] = 's';
	else if (S_ISCHR(file->data->stats.st_mode))
		file->data->perm[0] = 'c';
	else if (S_ISFIFO(file->data->stats.st_mode))
		file->data->perm[0] = 'p';
	else
		file->data->perm[0] = '-';
}

void	ft_free_files(t_file **files, t_opt *opt)
{
	t_file *freeable;
	t_file *move;

	if (*files && files)
	{
		move = *files;
		while (move)
		{
			freeable = move;
			move = move->next;
			ft_strdel(&freeable->data->name);
			ft_strdel(&freeable->data->path);
			if (opt->l)
			{
				ft_strdel(&freeable->data->mtime);
				ft_strdel(&freeable->data->link_name);
				ft_strdel(&freeable->data->user);
				ft_strdel(&freeable->data->group);
				ft_strdel(&freeable->data->mtime);
			}
			free(freeable->data);
			free(freeable);
		}
	}
}
