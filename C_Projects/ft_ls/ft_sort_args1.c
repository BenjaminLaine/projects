/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_sort_1.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/03/03 16:51:22 by blaine            #+#    #+#             */
/*   Updated: 2020/06/17 21:49:20 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_ls.h"

int		ft_date_cmp(t_dir *current, t_dir *next)
{
	struct stat buf1;
	struct stat buf2;

	stat(current->path, &buf1);
	stat(next->path, &buf2);
	return (buf1.st_mtime - buf2.st_mtime);
}

void	ft_sort_1(t_dir **current, t_dir **next, int *sorted)
{
	char *tmp;

	if ((ft_is_file((*current)->path) && ft_is_file((*next)->path))
		&& ((ft_strcmp((*current)->path, (*next)->path) > 0) && (*sorted = 1)))
	{
		tmp = (*current)->path;
		(*current)->path = (*next)->path;
		(*next)->path = tmp;
	}
	else if (ft_is_dir((*current)->path) && ft_is_file((*next)->path))
	{
		tmp = (*current)->path;
		(*current)->path = (*next)->path;
		(*next)->path = tmp;
		*sorted = 1;
	}
	else if ((ft_is_dir((*current)->path) && ft_is_dir((*next)->path))
		&& ((ft_strcmp((*current)->path, (*next)->path) > 0) && (*sorted = 1)))
	{
		tmp = (*current)->path;
		(*current)->path = (*next)->path;
		(*next)->path = tmp;
	}
}

void	ft_sort_2(t_dir **current, t_dir **next, int *sorted)
{
	char *tmp;

	if ((ft_is_file((*current)->path) && ft_is_file((*next)->path))
		&& ((ft_strcmp((*current)->path, (*next)->path) > 0) && (*sorted = 1)))
	{
		tmp = (*current)->path;
		(*current)->path = (*next)->path;
		(*next)->path = tmp;
	}
	else if (ft_is_dir((*current)->path) && ft_is_file((*next)->path))
	{
		tmp = (*current)->path;
		(*current)->path = (*next)->path;
		(*next)->path = tmp;
		*sorted = 1;
	}
	else if ((ft_is_dir((*current)->path) && ft_is_dir((*next)->path))
		&& ((ft_strcmp((*current)->path, (*next)->path) < 0) && (*sorted = 1)))
	{
		tmp = (*current)->path;
		(*current)->path = (*next)->path;
		(*next)->path = tmp;
	}
}

void	ft_sort_3(t_dir **current, t_dir **next, int *sorted)
{
	char *tmp;

	if ((ft_is_file((*current)->path) && ft_is_file((*next)->path))
		&& ((ft_date_cmp((*current), (*next)) < 0) && (*sorted = 1)))
	{
		tmp = (*current)->path;
		(*current)->path = (*next)->path;
		(*next)->path = tmp;
	}
	else if (ft_is_dir((*current)->path) && ft_is_file((*next)->path))
	{
		tmp = (*current)->path;
		(*current)->path = (*next)->path;
		(*next)->path = tmp;
		*sorted = 1;
	}
	else if ((ft_is_dir((*current)->path) && ft_is_dir((*next)->path))
		&& ((ft_date_cmp((*current), (*next)) < 0) && (*sorted = 1)))
	{
		tmp = (*current)->path;
		(*current)->path = (*next)->path;
		(*next)->path = tmp;
	}
}

void	ft_sort_4(t_dir **current, t_dir **next, int *sorted)
{
	char *tmp;

	if ((ft_is_file((*current)->path) && ft_is_file((*next)->path))
		&& ((ft_date_cmp((*current), (*next)) > 0) && (*sorted = 1)))
	{
		tmp = (*current)->path;
		(*current)->path = (*next)->path;
		(*next)->path = tmp;
	}
	else if (ft_is_dir((*current)->path) && ft_is_file((*next)->path))
	{
		tmp = (*current)->path;
		(*current)->path = (*next)->path;
		(*next)->path = tmp;
		*sorted = 1;
	}
	else if ((ft_is_dir((*current)->path) && ft_is_dir((*next)->path))
		&& ((ft_date_cmp((*current), (*next)) > 0) && (*sorted = 1)))
	{
		tmp = (*current)->path;
		(*current)->path = (*next)->path;
		(*next)->path = tmp;
	}
}
