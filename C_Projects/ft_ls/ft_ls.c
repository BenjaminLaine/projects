/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_ls.c                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/02/13 12:07:25 by blaine            #+#    #+#             */
/*   Updated: 2020/06/18 00:57:18 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_ls.h"

void	ft_arg_folders(t_dir *dir, t_opt *opt, int printed_files)
{
	t_dir *move;

	move = dir;
	while (dir)
	{
		move = move->next;
		if (printed_files == 2 || dir->next)
			ft_printf("%s:\n", dir->path);
		ft_fill_folder(dir, opt, 0);
		if (!opt->l && !opt->rr && move)
			write(1, "\n", 1);
		dir = move;
	}
}

int		ft_print_arg_files(t_dir **dir, t_opt *opt, t_max max)
{
	t_file	*file;
	t_dir	*freeable;

	if (ft_is_file((*dir)->path))
	{
		while (ft_is_file((*dir)->path))
		{
			freeable = (*dir);
			file = ft_new_file(opt, (*dir)->path, &max);
			ft_print_files(file, opt, 0, max);
			ft_free_files(&file, opt);
			(*dir) = (*dir)->next;
			free(freeable->path);
			free(freeable);
			if ((*dir) == NULL)
				return (0);
		}
		write(1, "\n", 1);
		return (2);
	}
	return (1);
}

int		main(int argc, char **argv)
{
	t_opt	*opt;
	t_dir	*dir;
	t_max	max;
	int		empty;

	max = ft_init_max();
	opt = ft_init_opti();
	dir = ft_init_dir();
	ft_get_args(argv, opt, dir, argc);
	if (dir->path)
	{
		ft_sort_a(&dir, opt);
		empty = ft_print_arg_files(&dir, opt, max);
		if (empty)
			ft_arg_folders(dir, opt, empty);
	}
	else
		free(dir);
	free(opt);
	return (0);
}
