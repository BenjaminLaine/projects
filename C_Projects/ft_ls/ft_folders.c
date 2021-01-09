/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_folders.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/06/18 00:34:14 by blaine            #+#    #+#             */
/*   Updated: 2020/06/18 00:54:27 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_ls.h"

static void	ft_free_dir(t_dir **dir, t_opt *opt)
{
	t_dir	*freeable;

	freeable = *dir;
	ft_free_files(&freeable->files, opt);
	free(freeable->path);
	free(freeable->previous);
	free(freeable);
}

static void	ft_check_sub(t_dir *dir, t_opt *opt)
{
	t_dir	*local;
	t_file	*move;

	move = dir->files;
	while (move && opt->rr)
	{
		if ((ft_is_dir(move->data->path))
			&& ft_strcmp(move->data->name, ".") != 0
			&& ft_strcmp(move->data->name, ".."))
		{
			local = ft_init_dir();
			if (!(local->path = ft_strdup(move->data->path)))
				ft_printf("%s", strerror(errno));
			ft_fill_folder(local, opt, 1);
		}
		move = move->next;
	}
	return ;
}

static void	ft_file_error(t_dir *dir, t_opt *opt)
{
	ft_printf("ft_ls: %s: %s\n", dir->path, strerror(errno));
	ft_free_dir(&dir, opt);
	dir->next == NULL ? write(1, "\n", 1) : 1;
}

static void	ft_read(t_dir **dir, struct dirent **dirt, t_opt *opt, t_max *max)
{
	char	*tmp;

	if (!((*dirt)->d_name[0] == '.') || opt->a)
	{
		tmp = ft_strjoin((*dir)->previous, (*dirt)->d_name);
		ft_lst_file(&(*dir)->files, ft_new_file(opt, tmp, max));
		ft_strdel(&tmp);
	}
}

void		ft_fill_folder(t_dir *dir, t_opt *opt, int i)
{
	DIR				*content;
	struct dirent	*dirt;
	t_max			max;

	max = ft_init_max();
	if (dir->previous == NULL)
		dir->previous = ft_strcmp(dir->path, "/") != 0 ?
			ft_strjoin(dir->path, "/") : ft_strdup("/");
	if ((content = opendir(dir->path)))
	{
		while ((dirt = readdir(content)))
			ft_read(&dir, &dirt, opt, &max);
		closedir(content);
		ft_sort_fa(&dir->files, opt);
		(i == 1) ? ft_printf("%s:\n", dir->path) : 1;
		ft_print_files(dir->files, opt, 1, max);
		(opt->l) ? write(1, "\n", 1) : 1;
		(dir->files == NULL && dir->next) ? write(1, "\n", 1) : 1;
		ft_check_sub(dir, opt);
		ft_free_dir(&dir, opt);
	}
	else
		ft_file_error(dir, opt);
}
